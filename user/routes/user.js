const express = require("express");
const signupModal = require("../modals/signup-modal");
const { checkExistingUser, generatePasswordHash } = require("../utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/login", (req, res) => {
  //res.status(200).send("Log in works")
  signupModal.find({ username: req.body.username }).then((userData) => {
    if (userData.length) {
      bcrypt.compare(req.body.password, userData[0].password).then((val) => {
        if (val) {
          const authToken = jwt.sign(
            userData[0].username,
            process.env.SECRETKEY
          );
          res.status(200).send({ authToken });
        } else {
          res.status(400).send("INVALID PASSWORD");
        }
      });
    } else {
      res.status(400).send("UNAUTHORIZED USER");
    }
  });
});
router.post("/register", async (req, res) => {
  //console.log(req.body)
  if (await checkExistingUser(req.body.username)) {
    res.status(400).send("Username Exist please try with different one");
  } else {
    generatePasswordHash(req.body.password).then((passwordHash) => {
      signupModal
        .create({
          username: req.body.username,
          phone_number: req.body.phone_number,
          password: passwordHash,
        })
        .then(() => {
          res.status(200).send(`${req.body.username} added successfully`);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(400).send(err.message);
        });
    });
  }
});

module.exports = router;
