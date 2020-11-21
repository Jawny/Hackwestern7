const express = require("express");
const putRoute = express.Router();

module.exports = putRoute.get("/data", (req, res) => {
  res.send("Got a Put request at /data");
});
