const express = require('express');
const Question = require('../models/Question');
const Auction = require('../models/Auction');

const router = express.Router();

// GET /api/questions/auction/:auctionId - Get all questions for an auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const questions = await Question.find({
      auction_id: req.params.auctionId,
      is_public: true
    })
      .populate('question_user_id', 'username avatar_url')
      .populate('answer_user_id', 'username avatar_url')
      .sort({ question_date: -1 })
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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/questions - Ask a new question
router.post('/', async (req, res) => {
  try {
    const { auction_id, question_user_id, question_text, is_public } = req.body;

    if (!auction_id || !question_user_id || !question_text) {
      return res.status(400).json({
        success: false,
        error: 'auction_id, question_user_id, and question_text are required'
      });
    }

    // Check if auction exists
    const auction = await Auction.findById(auction_id);
    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    const question = new Question({
      auction_id,
      question_user_id,
      question_text,
      is_public: is_public !== undefined ? is_public : true
    });

    await question.save();
    await question.populate('question_user_id', 'username avatar_url');

    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/questions/:id/answer - Answer a question
router.put('/:id/answer', async (req, res) => {
  try {
    const { answer_text, answer_user_id } = req.body;

    if (!answer_text || !answer_user_id) {
      return res.status(400).json({
        success: false,
        error: 'answer_text and answer_user_id are required'
      });
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    // Verify answerer is the seller
    const auction = await Auction.findById(question.auction_id);
    if (auction.seller_id.toString() !== answer_user_id) {
      return res.status(403).json({
        success: false,
        error: 'Only the seller can answer questions'
      });
    }

    question.answer_text = answer_text;
    question.answer_user_id = answer_user_id;
    question.answer_date = new Date();

    await question.save();
    await question.populate([
      { path: 'question_user_id', select: 'username avatar_url' },
      { path: 'answer_user_id', select: 'username avatar_url' }
    ]);

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/questions/user/:userId - Get all questions asked by a user
router.get('/user/:userId', async (req, res) => {
  try {
    const questions = await Question.find({ question_user_id: req.params.userId })
      .populate('auction_id', 'title images')
      .populate('answer_user_id', 'username')
      .sort({ question_date: -1 });

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/questions/:id - Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
