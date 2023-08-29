const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat.controller.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

/**
 * * below routes have a middleware "protect" to check if header of the request contain authorization token
 */

/** status: working */
router.post("/accessChat", protect, accessChat);

/** status: working */
router.get("/fetchChats", protect, fetchChats);

/** status: partial working */
router.post("/groupChat", protect, createGroupChat);

/** status: working */
router.put("/rename", protect, renameGroup);

/** status: working */
router.put("/addToGroup", protect, addToGroup);

/** status: working */
router.put("/removeFromGroup", protect, removeFromGroup);

module.exports = router;
