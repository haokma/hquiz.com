const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getList);
router.patch('/', CategoryController.delete);

router.get('/:id', CategoryController.getById);
router.patch('/:id', CategoryController.update);

module.exports = router;
