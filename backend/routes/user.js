const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authJWT");
const { signUp, signIn } = require("../controllers/auth.controller.js");

router.post("/register", signUp, function (req, res) {});

router.post("/login", signIn, function (req, res) {});

router.get("/hiddenContent", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  /**
   *TODO: access to this middleware route should be modified based on the roles
   */
  if (req.user.role == "admin" || req.user.role == "normal") {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      message: "UnAuthorized access",
    });
  }
});

module.exports = router;
