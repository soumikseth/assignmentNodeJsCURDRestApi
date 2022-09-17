const express = require("express");
const app = express();
const userController = require("./user/routes/user");

const postController = require("./user/routes/posts");
const jwt = require("jsonwebtoken");
const multer = require("multer")();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const unprotectedRoutes = ["/login", "/register"];
//starting server
app.listen(9000, (err) => {
  if (err) {
    console.log(err);
  } else {
    // console.log(err)
    console.log("Server started at port 9000");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer.array());

mongoose.connect(
  "mongodb://localhost/NodeJsBackendAssignment2",
  (data) => {
    console.log("Successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);
//1.defining our base route
app.get("/", (req, res) => {
  res.send("GIDA2 Backend");
});
//2.middleware
app.use("/", userController);
app.use("/", postController);
