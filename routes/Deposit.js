const express = require("express");
const putRoute = express.Router();
const BlockchainHandler = require('../scripts/blockchain');
require('dotenv').config({path: '../.env'});


module.exports = putRoute.put("/deposit", (req, res) => {
	const { phoneNumber, amount } = req.body

	const b = new BlockchainHandler(process.env.ADDRESS);
	b.init(() => {
		b.deposit(
			parseInt(phoneNumber),
			parseInt(amount)
		);

		res.json(true)
	});

});
