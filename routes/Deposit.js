const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

module.exports = postRoute.post("/deposit", (req, res) => {
  const { phoneNumber, amount } = req.body;
  let formattedPhoneNumber;
  if (phoneNumber[0] === "+") {
    formattedPhoneNumber = phoneNumber.substring(2);
  } else {
    formattedPhoneNumber = phoneNumber;
  }
  console.log(typeof formattedPhoneNumber, formattedPhoneNumber);

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(() => {
    b.deposit(parseInt(formattedPhoneNumber), parseInt(amount));

    res.json(true);
  });
});
