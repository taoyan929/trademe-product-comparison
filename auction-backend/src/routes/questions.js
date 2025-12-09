const express = require('express');
const Question = require('../models/Question');
const Auction = require('../models/Auction');
const User = require('../models/User');
const aiService = require('../services/aiService');

const router = express.Router();

// Configuration constants
const QUESTIONS_CONFIG = {
  DEFAULT_LIMIT: 10,
  DEFAULT_OFFSET: 0,
  AI_CONTEXT_LIMIT: 10,
  GUEST_USERNAME: 'Guest User',
  GUEST_EMAIL: 'guest@demo.com',
  GUEST_LOCATION: 'New Zealand',
  FALLBACK_RESPONSE: `Thanks for your question! This demo is currently running without AI-powered seller responses. To enable automatic answers, configure a Gemini API key or local Ollama model in your .env file. The seller will respond manually when available.`
};

// Reusable populate options for questions
const QUESTION_POPULATE_OPTIONS = [
  { path: 'question_user_id', select: 'username avatar_url' },
  { path: 'answer_user_id', select: 'username avatar_url' }
];

// Helper function for consistent error responses
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message
  });
};

// Helper function to set question answer
const setQuestionAnswer = (question, answerText, sellerId) => {
  question.answer_text = answerText;
  question.answer_user_id = sellerId;
  question.answer_date = new Date();
};

// GET /api/questions/ai-status - Check if AI auto-answer is configured
router.get('/ai-status', (req, res) => {
  res.json({
    success: true,
    configured: aiService.isConfigured(),
    provider: aiService.getProvider()
  });
});

// GET /api/questions/auction/:auctionId - Get all questions for an auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const { limit = QUESTIONS_CONFIG.DEFAULT_LIMIT, offset = QUESTIONS_CONFIG.DEFAULT_OFFSET } = req.query;

    const questions = await Question.find({
      auction_id: req.params.auctionId,
      is_public: true
    })
      .populate(QUESTION_POPULATE_OPTIONS)
      .sort({ question_date: 1 })
      .limit(Number(limit))
      .skip(Number(offset));

    const totalCount = await Question.countDocuments({
      auction_id: req.params.auctionId,
      is_public: true
    });

    res.json({
      success: true,
      count: questions.length,
      total: totalCount,
      data: questions
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// POST /api/questions - Ask a new question (with optional AI auto-answer)
router.post('/', async (req, res) => {
  try {
    const { auction_id, question_user_id, question_text, is_public } = req.body;

    if (!auction_id || !question_text) {
      return sendError(res, 400, 'auction_id and question_text are required');
    }

    // Check if auction exists and get full details for AI
    const auction = await Auction.findById(auction_id).populate('seller_id');
    if (!auction) {
      return sendError(res, 404, 'Auction not found');
    }

    // For demo mode: use provided user ID, or find/create a guest user
    let userId = question_user_id;
    if (!userId) {
      // Find or use a default guest user for demo
      let guestUser = await User.findOne({ username: QUESTIONS_CONFIG.GUEST_USERNAME });
      if (!guestUser) {
        guestUser = await User.create({
          username: QUESTIONS_CONFIG.GUEST_USERNAME,
          email: QUESTIONS_CONFIG.GUEST_EMAIL,
          location: QUESTIONS_CONFIG.GUEST_LOCATION
        });
      }
      userId = guestUser._id;
    }

    const question = new Question({
      auction_id,
      question_user_id: userId,
      question_text,
      is_public: is_public !== undefined ? is_public : true
    });

    await question.save();

    // Generate response - either AI-powered or fallback
    const sellerId = auction.seller_id._id || auction.seller_id;

    if (aiService.isConfigured()) {
      try {
        // Fetch previous questions for this auction to provide context
        const previousQuestions = await Question.find({
          auction_id: auction_id,
          _id: { $ne: question._id }
        })
          .sort({ question_date: 1 })
          .limit(QUESTIONS_CONFIG.AI_CONTEXT_LIMIT)
          .select('question_text answer_text');

        const aiResponse = await aiService.generateSellerResponse(
          auction,
          question_text,
          previousQuestions
        );

        setQuestionAnswer(question, aiResponse, sellerId);
        await question.save();
      } catch (aiError) {
        console.error('AI auto-answer failed:', aiError.message);
        setQuestionAnswer(question, QUESTIONS_CONFIG.FALLBACK_RESPONSE, sellerId);
        await question.save();
      }
    } else {
      // No AI configured - use fallback response
      setQuestionAnswer(question, QUESTIONS_CONFIG.FALLBACK_RESPONSE, sellerId);
      await question.save();
    }

    await question.populate(QUESTION_POPULATE_OPTIONS);

    res.status(201).json({
      success: true,
      data: question,
      ai_answered: !!question.answer_text
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// PUT /api/questions/:id/answer - Answer a question
router.put('/:id/answer', async (req, res) => {
  try {
    const { answer_text, answer_user_id } = req.body;

    if (!answer_text || !answer_user_id) {
      return sendError(res, 400, 'answer_text and answer_user_id are required');
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return sendError(res, 404, 'Question not found');
    }

    // Verify answerer is the seller
    const auction = await Auction.findById(question.auction_id);
    if (auction.seller_id.toString() !== answer_user_id) {
      return sendError(res, 403, 'Only the seller can answer questions');
    }

    question.answer_text = answer_text;
    question.answer_user_id = answer_user_id;
    question.answer_date = new Date();

    await question.save();
    await question.populate(QUESTION_POPULATE_OPTIONS);

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// GET /api/questions/user/:userId - Get all questions asked by a user
router.get('/user/:userId', async (req, res) => {
  try {
    const questions = await Question.find({ question_user_id: req.params.userId })
      .populate('auction_id', 'title images')
      .populate('answer_user_id', 'username')
      .sort({ question_date: 1 });

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// DELETE /api/questions/:id - Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return sendError(res, 404, 'Question not found');
    }

    res.json({
      success: true,
      message: 'Question deleted'
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

module.exports = router;
