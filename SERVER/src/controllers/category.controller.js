const slugify = require('slugify');
const Pagination = require('../helpers/pagination');
const queryFilter = require('../helpers/query');
const Category = require('../models/category.model');

const CategoryController = {
  create: async (req, res) => {
    const { parentId, status, image, name } = req.body;
    const slug = slugify(name);
    const newCategory = {
      name,
      image,
      status,
      parentId: parentId || null,
      slug,
    };
    try {
      const category = await Category.create(newCategory);
      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getList: async (req, res) => {
    let { page, limit, order, orderBy, name_like, status } = req.query;
    let skip, sort, query;
    try {
      name_like = name_like || '';
      page = Pagination.page(+page);
      limit = Pagination.limit(+limit);
      skip = Pagination.skip(+page, +limit);
      sort = Pagination.sort(order, orderBy);
      query = {
        parentId: null,
        name: { $regex: name_like },
      };
      query = queryFilter(query, { status });

      const categories = await Category.find(query).sort(sort).skip(skip).limit(limit);

      res.status(200).json({
        categories,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  delete: async (req, res) => {
    const categoryId = req.body;
    const listCategory = [];

    try {
      //  Renove Array Category
      const category = await Category.deleteMany({
        _id: { $in: categoryId },
      });

      for (let i = 0; i < categoryId.length; i++) {
        const id = categoryId[i];
        listCategory[i] = Category.find({ parentId: id }).remove();
      }
      // Remove all Sub Category
      Promise.all(listCategory);

      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const updatecategory = req.body;

    try {
      const isCheck = await Category.findById(id);
      if (!isCheck) {
        return res.status(400).json({
          error: 'Không tìm thấy danh mục',
        });
      }

      const category = await Category.findByIdAndUpdate(id, updatecategory, {
        new: true,
      });

      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);
      if (!category) {
        res.status(400).json({
          error: 'Không tìm thấy danh mục',
        });
      }
      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
};

module.exports = CategoryController;
