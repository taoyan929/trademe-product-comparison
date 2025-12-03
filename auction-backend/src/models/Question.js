const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  auction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  question_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question_text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  question_date: {
    type: Date,
    default: Date.now
  },
  answer_text: {
    type: String,
    default: null,
    trim: true,
    maxlength: 1000
  },
  answer_date: {
    type: Date,
    default: null
  },
  answer_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  is_public: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for performance
questionSchema.index({ auction_id: 1, question_date: -1 });
questionSchema.index({ question_user_id: 1 });

// Virtual to check if question is answered
questionSchema.virtual('is_answered').get(function() {
  return this.answer_text !== null && this.answer_text !== '';
});

// Ensure virtuals are included when converting to JSON
questionSchema.set('toJSON', { virtuals: true });
questionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Question', questionSchema);
