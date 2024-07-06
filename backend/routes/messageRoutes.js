import { Router } from "express";
import { fetchChatMessages } from "../controllers/message/fetchChatMessages.js";
import { sendMessage } from "../controllers/message/sendMessage.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

/** status: working */
router.post("/sendMessage", protect, sendMessage);

/** status: working */
router.get("/messages/:chatId", fetchChatMessages);

export default router;
