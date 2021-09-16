import mongoose from 'mongoose';

const { Schema }: any = mongoose;

const categorySchema = Schema({});

const Category = mongoose.model('category', categorySchema, 'category');

export default Category;
