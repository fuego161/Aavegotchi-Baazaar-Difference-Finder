import { Component } from 'react';
import { ethers } from 'ethers';
import abi from '../diamondABI/diamond.json';
import { Header } from './Header';
import { Footer } from './Footer';
import { Listings } from './Listings';

export class Dapp extends Component {
	constructor(props) {
		super(props);

		// Connect
		this.aavegotchiContract = this.connect();
	}

	connect() {
		// Create the connection
		const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');

		// Set the aavegotchi address
		const aavegotchiAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

		// Get the aavegotchi contract
		const aavegotchiContract = new ethers.Contract(aavegotchiAddress, abi, provider);

		// Connect to the aavegotchi contract
		return aavegotchiContract.connect(provider);
	}

	render() {
		return (
			<>
				<Header />
				<Listings contract={this.aavegotchiContract}/>
				<Footer />
			</>
		);
	}
}



