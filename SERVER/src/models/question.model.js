const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema(
  {
    name: { type: String, require },
    answers: { type: Object, default: {} },
    topicId: Schema.Types.ObjectId,
    status: { type: String, default: 'ACTIVE' },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('question', questionSchema, 'question');

module.exports = Question;
