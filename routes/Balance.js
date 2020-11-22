const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require('../scripts/blockchain');
require('dotenv').config({path: '../.env'});

// @route POST api/balance
// @desc Retrieves balance information of account provided by phone number
// @access Public
module.exports = postRoute.post("/balance", (req, res) => {

	const b = new BlockchainHandler(process.env.ADDRESS);
	b.init(async () => {
		res.json(await b.readUser(parseInt(req.body.phoneNumber)));
	});

});
