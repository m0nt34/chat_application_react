import express from "express";
import userController from "../controllers/authControllers.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/check", authenticate, userController.isLoggedIn);

export default router;
