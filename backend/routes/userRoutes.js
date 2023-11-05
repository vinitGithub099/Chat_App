const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  allUsers,
  refreshToken,
  fetchUserDetails,
  logout,
} = require("../controllers/user.controller.js");

const { protect } = require("../middlewares/authMiddleware.js");

/** status: Working */
router.post("/register", registerUser);

/** status: Working */
router.post("/login", loginUser);

/** status: Working */
router.get("/allUsers", protect, allUsers);

/** status: Working */
router.post("/refresh-token", protect, refreshToken);

/** status: Working */
router.post("/auto-login", protect, fetchUserDetails);

/** status: Working */
router.post("/logout", logout);

module.exports = router;
