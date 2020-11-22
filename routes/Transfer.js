const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

module.exports = postRoute.post("/transfer", (req, res) => {
  const { phoneNumber, amount, receiver } = req.body;

  let formattedPhoneNumber;
  if (phoneNumber[0] === "+") {
    formattedPhoneNumber = phoneNumber.substring(2);
  } else {
    formattedPhoneNumber = phoneNumber;
  }

  let formattedReceiver;
  if (receiver[0] === "+") {
    formattedReceiver = receiver.substring(2);
  } else {
    formattedReceiver = receiver;
  }
  console.log(typeof formattedPhoneNumber, formattedPhoneNumber);

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(() => {
    b.transfer(
      parseInt(formattedPhoneNumber),
      parseInt(amount),
      parseInt(formattedReceiver)
    );

    res.json(true);
  });
});
