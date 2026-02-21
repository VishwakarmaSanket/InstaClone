const express = require("express");
const authRouter = express.Router();
const {
  registerController,
  loginController,
  getMeController,
} = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

// /api/auth/register
authRouter.post("/register", registerController);

// /api/auth/login
authRouter.post("/login", loginController);

authRouter.get("/get-me", identifyUser, getMeController);

module.exports = authRouter;
