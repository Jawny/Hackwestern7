const express = require("express");
const putRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

module.exports = putRoute.put("/deposit", (req, res) => {
  const { phoneNumber, amount } = req.body;
  let formattedPhoneNumber;
  if (phoneNumber[0] === "+") {
    formattedPhoneNumber = phoneNumber.substring(2);
  } else {
    formattedPhoneNumber = phoneNumber;
  }

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(() => {
    b.deposit(parseInt(formattedPhoneNumber), parseInt(amount));

    res.json(true);
  });
});
