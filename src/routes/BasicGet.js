const express = require("express");
const getRoute = express.Router();

module.exports = getRoute.get("/get", (req, res) => {
  res.send("Got a GET request at /get");
});
