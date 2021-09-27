const express = require('express');
const AuthController = require('../controllers/user.controller');
const { adminMiddleware, authMiddleware } = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/getUsers', authMiddleware, adminMiddleware, AuthController.getUserList);
router.get('/get-user-id/:id', authMiddleware, adminMiddleware, AuthController.getUserId);
router.patch('/update/:id', authMiddleware, adminMiddleware, AuthController.update);

module.exports = router;
