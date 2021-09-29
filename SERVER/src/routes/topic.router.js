const express = require('express');
const TopicController = require('../controllers/topic.controller');

const router = express.Router();

router.get('/:slug', TopicController.getBySlug);
router.post('/', TopicController.create);
router.get('/', TopicController.getList);
router.patch('/', TopicController.delete);

module.exports = router;
