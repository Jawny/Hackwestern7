const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

module.exports = postRoute.post("/twilio-image", async (req, res) => {
  const { link } = req.body;
  const result = true; // send image link to api
  res.send(result);
});
