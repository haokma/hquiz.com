const slugify = require('slugify');
const Pagination = require('../helpers/pagination');
const Question = require('../models/question.model');
const Topic = require('../models/topic.model');

const TopicController = {
  create: async (req, res) => {
    const { name, time, image, questionCount, categoryId, userId, description, status } = req.body;
    const slug = slugify(name);
    const newTopic = {
      name,
      slug,
      image,
      time,
      questionCount,
      categoryId,
      userId,
      description,
      status,
    };
    try {
      const topic = await Topic.create(newTopic);
      res.status(200).json({
        topic,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getList: async (req, res) => {
    let { page, limit, order, orderBy, name_like, categoryId } = req.query;
    let skip, sort, query;
    try {
      name_like = name_like || '';
      page = Pagination.page(+page);
      limit = Pagination.limit(+limit);
      skip = Pagination.skip(+page, +limit);
      sort = Pagination.sort(order, orderBy);
      query = {
        name: { $regex: name_like },
      };
      if (categoryId) {
        query.categoryId = categoryId;
      }

      const topicList = await Topic.find(query).sort(sort).skip(skip).limit(limit);
      const total = await Topic.find(query).count();

      res.status(200).json({
        topicList,
        pagination: Pagination.result(limit, page, total),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getBySlug: async (req, res) => {
    const { slug } = req.params;

    try {
      const topic = await Topic.findOne({ slug });
      if (!topic) {
        return res.status(400).json({
          error: 'Không tìm thấy danh mục',
        });
      }

      const questions = await Question.find({
        topicId: topic._id,
      });
      topic.questions = questions;

      res.status(200).json({
        topic,
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
  delete: async (req, res) => {
    const topicId = req.body;
    try {
      //  Renove Array Category
      const topic = await Topic.deleteMany({
        _id: { $in: topicId },
      });

      res.status(200).json({
        topic,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
};

module.exports = TopicController;
