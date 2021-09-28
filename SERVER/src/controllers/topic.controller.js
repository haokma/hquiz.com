const slugify = require('slugify');
const Pagination = require('../helpers/pagination');
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
    let { page, limit, order, orderBy, name_like } = req.query;
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

      const topicList = await Topic.find(query).sort(sort).skip(skip).limit(limit);

      res.status(200).json({
        topicList,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
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
