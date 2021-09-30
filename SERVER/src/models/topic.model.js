const mongoose = require('mongoose');

const { Schema } = mongoose;

const topicSchema = Schema(
  {
    name: { type: String, require },
    description: { type: String, require },
    slug: { type: String, require },
    questionCount: { type: Number, require },
    image: { type: String, require },
    time: { type: Number, require },
    views: { type: Number, default: 0 },
    status: { type: String, default: 'ACTIVE' },
    categoryId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
    questions: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model('topic', topicSchema, 'topic');

module.exports = Topic;
