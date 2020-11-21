const express = require("express");
const postRoute = express.Router();

module.exports = postRoute.post("/post", (req, res) => {
  res.json(true);
});
