import { Router } from "express";
import { accessChat } from "../controllers/chat/accessChat.js";
import { addGroupMember } from "../controllers/chat/addGroupMember.js";
import { createGroupChat } from "../controllers/chat/createGroupChat.js";
import { fetchChats } from "../controllers/chat/fetchChats.js";
import { removeChatMember } from "../controllers/chat/removeChatMember.js";
import { renameChat } from "../controllers/chat/renameChat.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = Router();

/**
 * * below routes have a middleware "protect" to check if header of the request contain authorization token
 */

/** status: working */
router.post("/accessChat", protect, accessChat);

/** status: working */
router.get("/fetchChats", protect, fetchChats);

/** status: working */
router.post("/createGroupChat", protect, createGroupChat);

/** status: working */
router.put("/rename", protect, renameChat);

/** status: working */
router.put("/addGroupMember", protect, addGroupMember);

/** status: working */
router.put("/removeChatMember", protect, removeChatMember);

export default router;
