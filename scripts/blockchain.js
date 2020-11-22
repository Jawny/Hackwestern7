const Web3 = require('web3');
const MyContract = require('../build/contracts/MyContract.json');
require('dotenv').config({path: '../.env'});

class BlockchainHandler {
	constructor(account) {
		this.web3 = new Web3(process.env.INFURA_URL);
		this.account = account;
	}

	async init(callback) {
		this.networkId = await this.web3.eth.net.getId();
		this.myContract = new this.web3.eth.Contract(
			MyContract.abi,
			MyContract.networks[this.networkId].address
		);

		callback.bind(this)();
	}

	async signTransaction(tx) {
		const gas = await tx.estimateGas({from: this.account});
		const gasPrice = await this.web3.eth.getGasPrice();
		const data = tx.encodeABI();
		const nonce = await this.web3.eth.getTransactionCount(this.account);
		return await this.web3.eth.accounts.signTransaction(
			{
				to: this.myContract.options.address,
				data,
				gas,
				gasPrice,
				nonce,
				chainId: this.networkId
			},
			process.env.PRIVATE_KEY	
		);
	}

	async createUser(phoneNumber, pin) {
		const tx = this.myContract.methods.createUser(phoneNumber, pin);	
		const signedTx = await this.signTransaction(tx);

		const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		console.log(`Transaction hash: ${receipt.transactionHash}`);
	}

	async readUser(phoneNumber) {
		const tx = await this.myContract.methods.readUser(phoneNumber).call();
		return(tx);
	}
}

module.exports = BlockchainHandler

/*
const penis = new BlockchainHandler(process.env.ADDRESS);
penis.init(async () => {
	// await penis.createUser(7785130738, 1838);
});

*/
