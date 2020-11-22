const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

// @route POST api/balance
// @desc Retrieves balance information of account provided by phone number
// @access Public
module.exports = postRoute.post("/delete", (req, res) => {
  const { phoneNumber } = req.body;

  let formattedPhoneNumber;
  if (phoneNumber[0] === "+") {
    formattedPhoneNumber = phoneNumber.substring(2);
  } else {
    formattedPhoneNumber = phoneNumber;
  }
  console.log(typeof formattedPhoneNumber, formattedPhoneNumber);

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(async () => {
    await b.delete(parseInt(formattedPhoneNumber));
    return true;
  });
});
