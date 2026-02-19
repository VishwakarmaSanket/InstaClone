const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      // ref: "users",
      // required: [true, "Follower is required"],
    },
    followee: {
      type: String,
      // ref: "users",
      // required: [true, "Followee is required"],
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
