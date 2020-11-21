const express = require("express");
const putRoute = express.Router();

module.exports = putRoute.put("/data", (req, res) => {
  res.send("Got a Put request at /data");
});
