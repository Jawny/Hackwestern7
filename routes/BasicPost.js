const express = require("express");
const postRoute = express.Router();

module.exports = postRoute.get("/post", (req, res) => {
  res.json(true);
});
