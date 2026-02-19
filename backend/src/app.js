const express = require("express");
const cookieParser = require("cookie-parser");

// Required Routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

const app = express();
app.use(express.json()); // Works for raw type of data in body
app.use(cookieParser());

// Using Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
