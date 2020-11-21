const express = require("express");
const postRoute = express.Router();
const BlockchainHandler = require('../scripts/blockchain');
require('dotenv').config({path: '../.env'});

module.exports = postRoute.post("/balance", (req, res) => {
	/*
  const obj = { response: "we did it!" };
  res.json(obj);
	*/

	const b = new BlockchainHandler(process.env.ADDRESS);
	b.init(async () => {
		res.json(await b.readUser(0));
	});
});
