const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  post_name: String,
  post_id: String,
  post_image: String,
});
const postModal = mongoose.model("post", postSchema);
module.exports = postModal;
