const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = Schema({});

const History = mongoose.model('history', historySchema, 'history');

module.exports = History;
