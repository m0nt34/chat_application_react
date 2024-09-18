import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import chatControllers from "../controllers/chatControllers.js";
const router = express.Router();

router.post("/create-chat", authenticate, chatControllers.createChat);
router.post("/post-message", authenticate, chatControllers.postMessage);
router.post("/send-request", authenticate, chatControllers.sendRequest);
router.post("/decline-request", authenticate, chatControllers.declineRequests);
router.post("/accept-request", authenticate, chatControllers.acceptRequests);

router.get("/search-users", authenticate, chatControllers.searchUsers);
router.get("/get-messages", authenticate, chatControllers.getMessages);
router.get("/get-chat", authenticate, chatControllers.getChat);
router.patch("/update-chat", authenticate, chatControllers.updateChat);

export default router;
 