const express = require("express");
const router = express.Router();
const postModal = require("../modals/post-modal");
router.get("/posts", (req, res) => {
  postModal.find().then((postData) => {
    res.status(200).send({ post: postData });
  });
});
router.post("/posts", (req, res) => {
  postModal.insertMany(req.body.posts).then((postData) => {
    postModal.create({
      post_name: req.body.post_name,
      post_id: req.body.post_id,
      post_image: req.body.post_image,
    });
    res.status(200).send("Data Added Successfully");
  });
});
router.put("/posts/:postId", (req, res) => {
  postModal
    .find({ post_id: req.params.postId })
    .updateMany({
      post_name: req.body.post_name,

      post_id: req.body.post_id,

      post_image: req.body.post_image,
    })
    .then(() => {
      res.status(200).send("Post Updated Successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.delete("/posts/:postId", (req, res) => {
  postModal
    .deleteOne({ post_id: req.params.postId })
    .then(() => {
      res.status(200).send("Post Deleted Successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  //console.log(req.params)
});

module.exports = router;
