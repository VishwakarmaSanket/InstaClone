const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/likes.model");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: req.user.ID,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const userID = req.user.ID;

  const posts = await postModel.find({
    user: userID,
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userID = req.user.ID;
  const postID = req.params.postid;

  const post = await postModel.findById(postID);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isUserValid = post.user.toString() == userID;
  if (!isUserValid) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postID = req.params.postID;

  const isPostExist = await postModel.findById(postID);
  if (!isPostExist) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isAlreadyLiked = await likeModel.findOne({
    post: postID,
    user: username,
  });
  if (isAlreadyLiked) {
    return res.status(400).json({
      message: "You have already liked this post",
    });
  }

  const like = await likeModel.create({
    post: postID,
    user: username,
  });

  res.status(201).json({
    message: "Post liked successfully",
    like,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailsController,
  likePostController,
};
