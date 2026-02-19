const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUserName = req.user.username;
  const followeeUserName = req.params.username;

  if (followerUserName === followeeUserName) {
    return res.status(400).json({
      message: "You cannot follow yourself !",
    });
  }

  const isFolloweeExist = await userModel.findOne({
    username: followeeUserName,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist !!!",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });

  if (isAlreadyFollowing) {
    if (isAlreadyFollowing.status === "pending") {
      return res.status(409).json({
        message: `Follow request to ${followeeUserName} is already pending`,
      });
    }

    if (isAlreadyFollowing.status === "accepted") {
      return res.status(409).json({
        message: `You are already following ${followeeUserName}`,
      });
    }

    if (isAlreadyFollowing.status === "rejected") {
      isAlreadyFollowing.status = "pending";
      await isAlreadyFollowing.save();

      return res.status(200).json({
        message: `Follow request to ${followeeUserName} is pending`,
      });
    }
  }

  const followRecord = await followModel.create({
    follower: followerUserName,
    followee: followeeUserName,
    status: "pending",
  });

  res.status(201).json({
    message: `Follow request send to ${followeeUserName}`,
    followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUserName = req.user.username;
  const followeeUserName = req.params.username;

  const isUserfollowing = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });

  if (!isUserfollowing) {
    return res.status(404).json({
      message: `You are not following ${followeeUserName}`,
    });
  }

  await followModel.findByIdAndDelete(isUserfollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUserName}`,
  });
}

async function followRequestController(req, res) {
  const followerUserName = req.params.followerUsername;
  const followeeUserName = req.user.username;
  const { action } = req.body;

  const isFollowRequestExist = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });

  if (!isFollowRequestExist) {
    return res.status(404).json({
      message: `Follow request from ${followerUserName} does not exist`,
    });
  }

  if (
    isFollowRequestExist.status === "accepted" ||
    isFollowRequestExist.status === "rejected"
  ) {
    return res.status(400).json({
      message: `Follow request from ${followerUserName} is already ${isFollowRequestExist.status}`,
    });
  }

  isFollowRequestExist.status = action;
  await isFollowRequestExist.save();

  res.status(200).json({
    message: `Follow request from ${followerUserName} is ${action}`,
    followRequest: isFollowRequestExist,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  followRequestController,
};
