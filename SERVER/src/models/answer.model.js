const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = Schema({});

const Answer = mongoose.model('category', answerSchema, 'category');

module.exports = Answer;
