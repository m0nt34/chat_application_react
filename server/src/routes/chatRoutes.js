import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import chatControllers from "../controllers/chatControllers.js";
const router = express.Router();

router.post("/create-chat", chatControllers.createChat);
router.post("/post-message", chatControllers.postMessage);
router.get("/get-messages", chatControllers.getMessages);

export default router;
