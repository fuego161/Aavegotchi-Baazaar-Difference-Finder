import abi from '../../diamondABI/diamond.json';
import { ethers } from 'ethers';

export default class Contract {
	// Set the contract address
	static address = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

	// Set the to be defined connection
	static CONNECTION = Contract.CONNECTION || new Contract().init();

	init() {
		// Create the connection
		const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');

		// Get the aavegotchi contract
		const contract = new ethers.Contract(Contract.address, abi, provider);

		// Store the connection
		return contract.connect(provider);
	}
}
