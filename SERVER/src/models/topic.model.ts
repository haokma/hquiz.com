import mongoose from 'mongoose';

const { Schema }: any = mongoose;

const topicSchema = Schema({});

const Topic = mongoose.model('topic', topicSchema, 'topic');

export default Topic;
