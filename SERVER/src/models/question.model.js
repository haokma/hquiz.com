const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = Schema({});

const Question = mongoose.model('question', questionSchema, 'question');

module.exports = Question;
