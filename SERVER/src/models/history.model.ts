import mongoose from 'mongoose';

const { Schema }: any = mongoose;

const historySchema = Schema({});

const History = mongoose.model('history', historySchema, 'history');

export default History;
