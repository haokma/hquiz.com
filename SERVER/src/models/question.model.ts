import mongoose from 'mongoose';

const { Schema }: any = mongoose;

const questionSchema = Schema({});

const Question = mongoose.model('question', questionSchema, 'question');

export default Question;
