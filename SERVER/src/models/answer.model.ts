import mongoose from 'mongoose';

const { Schema }: any = mongoose;

const answerSchema = Schema({});

const Answer = mongoose.model('category', answerSchema, 'category');

export default Answer;
