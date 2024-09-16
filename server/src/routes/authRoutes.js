import express from "express";
import userController from "../controllers/authControllers.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/send-email",userController.sendOtpEmail);
router.post("/send-link",userController.sendLink);
 
router.post("/check/user", userController.userExists);
router.post("/check/otp",userController.checkOtp);
router.post("/check/link",userController.checkLink);
router.patch("/reset-password",userController.changePassword);
router.get("/check", authenticate, userController.isLoggedIn);
router.get("/get-data", authenticate, userController.getUser);

router.get("/logout",userController.logout);

export default router;
  