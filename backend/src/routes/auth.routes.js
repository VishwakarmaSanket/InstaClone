const express = require("express");
const authRouter = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

// /api/auth/register
authRouter.post("/register", registerController);

// /api/auth/login
authRouter.post("/login", loginController);

module.exports = authRouter;
