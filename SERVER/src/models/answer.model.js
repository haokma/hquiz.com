const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema(
  {
    answers: { type: Array, require },
    questionId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model('answers', answerSchema, 'answers');

module.exports = Answer;
