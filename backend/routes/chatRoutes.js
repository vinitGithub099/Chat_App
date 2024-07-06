import { Router } from "express";
import { accessChat } from "../controllers/chat/accessChat.js";
import { addGroupMember } from "../controllers/chat/addGroupMember.js";
import { createGroup } from "../controllers/chat/createGroup.js";
import { fetchChats } from "../controllers/chat/fetchChats.js";
import { removeGroupMember } from "../controllers/chat/removeGroupMember.js";
import { renameGroup } from "../controllers/chat/renameGroup.js";
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
router.post("/createGroup", protect, createGroup);

/** status: working */
router.put("/renameGroup", protect, renameGroup);

/** status: working */
router.put("/addGroupMember", protect, addGroupMember);

/** status: working */
router.put("/removeGroupMember", protect, removeGroupMember);

export default router;
