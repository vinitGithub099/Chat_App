const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/message.controller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/** status: working */
router.post("/sendMessage", protect, sendMessage);

/** status: working */
router.get("/messages/:chatId", allMessages);

module.exports = router;
