const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require('../scripts/blockchain');
require('dotenv').config({path: '../.env'});

// @route POST api/register
// @desc Creates new account with phone and pin
// @access Public
module.exports = postRoute.post("/register", (req, res) => {
	const { phoneNumber, pin } = req.body

	const b = new BlockchainHandler(process.env.ADDRESS);
	b.init(() => {
		b.createUser(
			parseInt(phoneNumber),
			parseInt(pin)
		)

		res.json(true)
	});
});
