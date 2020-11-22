const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

module.exports = postRoute.put("/deposit", (req, res) => {
  const { phoneNumber, amount, receiver } = req.body;

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(() => {
    b.transfer(parseInt(phoneNumber), parseInt(amount), parseInt(receiver));

    res.json(true);
  });
});
