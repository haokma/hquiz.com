const mongoose = require('mongoose');

const { Schema } = mongoose;

const topicSchema = Schema({});

const Topic = mongoose.model('topic', topicSchema, 'topic');

module.exports = Topic;
