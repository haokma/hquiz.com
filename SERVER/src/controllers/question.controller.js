const Question = require('../models/question.model');
const Answer = require('../models/answer.model');

const QuestionController = {
  create: async (req, res) => {
    const { name, topicId, answers, status } = req.body;
    const newQuestion = {
      name,
      topicId,
      answers,
      status,
    };
    try {
      const question = await Question.create(newQuestion);

      const newAnswer = {
        questionId: question._id,
        answers,
      };

      const answer = await Answer.create(newAnswer);
      question.answers = answer;

      res.status(200).json({
        question
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = QuestionController;
