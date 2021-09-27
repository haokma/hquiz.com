const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = Schema(
  {
    name: { type: String, require: [true, 'Vui lòng nhập tên danh mục'], min: 3, max: 128 },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      require: true,
      default: 'ACTIVE',
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('category', categorySchema, 'category');

module.exports = Category;
