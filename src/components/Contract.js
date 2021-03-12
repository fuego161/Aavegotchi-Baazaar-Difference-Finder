import abi from '../diamondABI/diamond.json';
import { ethers } from 'ethers';

export class Contract {
	constructor() {
		// Set the contract address
		this.address = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
		// Get the contract ABI
		this.abi = abi;

		// Set the to be defined connection
		this.connection = undefined;

		// Initialise the connection
		this.init();
	}

	getConnection() {
		if (!this.connection) {
			console.log('New Connection');
			this.connection = new Contract();
		}

		return this.connection;
	}

	init() {
		// Create the connection
		const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');

		// Get the aavegotchi contract
		const contract = new ethers.Contract(this.address, this.abi, provider);

		// Store the connection
		console.log('Initial Connection');
		this.connection = contract.connect(provider);
	}
}
