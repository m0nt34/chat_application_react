import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import chatControllers from "../controllers/chatControllers.js";
const router = express.Router();

router.post("/create-chat", chatControllers.createChat);
router.post("/post-message", chatControllers.postMessage);
router.post("/send-request", chatControllers.sendRequest);
router.post("/decline-request", chatControllers.declineRequests);
router.post("/accept-request", chatControllers.acceptRequests);

router.get("/search-users", chatControllers.searchUsers);
router.get("/get-messages", chatControllers.getMessages);

export default router;
