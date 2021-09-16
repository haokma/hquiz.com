import express from "express";
import AuthController from "../controllers/user.controller";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/user.middleware";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh-token", AuthController.refreshToken);
router.get(
  "/getUsers",
  authMiddleware,
  adminMiddleware,
  AuthController.getUserList
);
router.get(
  "/get-user-id/:id",
  authMiddleware,
  adminMiddleware,
  AuthController.getUserId
);
router.patch(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  AuthController.update
);

export default router;
