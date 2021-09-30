const express = require('express');
const QuestionController = require('../controllers/question.controller');

const router = express.Router();

router.post('/', QuestionController.create);

module.exports = router;
