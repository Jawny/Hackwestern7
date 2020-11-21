const express = require("express");
const postRoute = express.Router();

module.exports = postRoute.get("/post", (req, res) => {
  res.send("Got a POST request at /post");
});
