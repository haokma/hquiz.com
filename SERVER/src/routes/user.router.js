const express = require('express');
const AuthController = require('../controllers/user.controller');
const { adminMiddleware, authMiddleware } = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/', AuthController.getUserList);
router.get('/:id', AuthController.getUserId);
router.patch('/:id', AuthController.update);

module.exports = router;
