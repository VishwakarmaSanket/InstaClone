const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

// @Route :
// @Description
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

// @Route :
// @Description
postRouter.get("/", identifyUser, postController.getPostsController);

// @Route :
// @Description

// GET /api/posts/details/:postid
// - return an detail about specific post with the id , also check whether the post
// belongs to the user from whom the request is coming
postRouter.get(
  "/details/:postID",
  identifyUser,
  postController.getPostDetailsController,
);

postRouter.post(
  "/like/:postID",
  identifyUser,
  postController.likePostController,
);

module.exports = postRouter;
