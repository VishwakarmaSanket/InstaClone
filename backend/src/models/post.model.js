const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgURL: {
    type: String,
    required: [true, "imgURL is required for creaing a post"],
  },
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserID is required for creating a post"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
