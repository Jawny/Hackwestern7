const express = require("express");
const postRoute = express.Router();

module.exports = postRoute.post("/post", (req, res) => {
  const obj = { response: "we did it!" };
  res.json(obj);
});
