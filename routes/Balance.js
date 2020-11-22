const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require("../scripts/blockchain");
require("dotenv").config({ path: "../.env" });

// @route POST api/balance
// @desc Retrieves balance information of account provided by phone number
// @access Public
module.exports = postRoute.post("/balance", (req, res) => {
  const { phoneNumber } = req.body;

  let formattedPhoneNumber;
  if (phoneNumber[0] === "+") {
    formattedPhoneNumber = phoneNumber.substring(2);
  } else {
    formattedPhoneNumber = phoneNumber;
  }

  const b = new BlockchainHandler(process.env.ADDRESS);
  b.init(async () => {
    data = await b.readUser(parseInt(formattedPhoneNumber));

    res.json({
      phoneNumber: data[0],
      balance: data[1],
    });
  });
});
