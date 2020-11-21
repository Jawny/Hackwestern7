const express = require("express");
const deleteRoute = express.Router();

module.exports = deleteRoute.get("/data", (req, res) => {
  res.send("Got a DELETE request at /data");
});
