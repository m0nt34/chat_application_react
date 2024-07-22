import express from "express";
import userController from "../controllers/authControllers.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/send-email",userController.sendOtpEmail);
router.post("/check/user", userController.userExists);
router.post("/check/otp",userController.checkOtp);
router.get("/check", authenticate, userController.isLoggedIn);
export default router;
