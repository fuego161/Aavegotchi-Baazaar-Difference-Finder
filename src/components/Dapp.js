import { Component } from 'react';
import { BigNumber, ethers } from 'ethers';
import abi from '../diamondABI/diamond.json';
import { Header } from './Header';
import { Loading } from './Loading';
import { Listings } from './Listings';
import { NoListings } from './NoListings';
import { Options } from './Options';

export class Dapp extends Component {
	constructor(props) {
		super(props);

		// Set the value to divide the price in wei by
		this.divideBy = BigNumber.from('1000000000000000000');

		// Connect
		this.aavegotchiContract = this.connect();

		this.handleOptionsSubmit = this.handleOptionsSubmit.bind(this);

		this.state = {
			values: {
				category: 0,
				valueDifference: 25,
			},
			type: '1155',
			listings: undefined,
		};
		
	}

	componentDidMount() {
		this.getListings();
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

	orderItems(listing) {
		return listing.sort((a, b) => a['priceInGHST'] - b['priceInGHST']);
	}

	async groupListings() {
		// const category = await this.state.category;
		// Get the listings in the baazaar
		const listings = await this.aavegotchiContract.getERC1155Listings(this.state.values.category, 'listed', 3500);

		// Set an object to store the formatted listings
		const formattedListings = {};

		// Loop over each listing
		for (const listing of listings) {
			// Get the data needed from the listing
			const { listingId, erc1155TypeId, priceInWei } = listing;
	
			// We know these numbers are safe for JS, so convert them
			const formattedTypeId = erc1155TypeId.toNumber();
			const formattedListingId = listingId.toNumber();
	
			// Divide the price in wei to get the value in GHST
			const formattedpriceInWei = priceInWei.div(this.divideBy);
			// We know this will be a safe low number now
			const priceInGHST = formattedpriceInWei.toNumber();

			// If the type ID doesn't exist as a key, add it
			if (!formattedListings.hasOwnProperty(formattedTypeId)) formattedListings[formattedTypeId] = [];

			// Pass the object we'd like to place within the type array
			formattedListings[formattedTypeId].push({
				listingId: formattedListingId,
				priceInGHST,
			});
		}

		return formattedListings;
	}

	async orderGroupedListings(groupedListings) {
		const listings = await groupedListings;

		// Set an object to store the ordered listings
		const orderedListings = {};
	
		for (const [item, listing] of Object.entries(listings)) {
			// Don't order or include if only one for sale
			if (listing.length <= 1) continue;

			// Get the items ordered by priceInGHST
			const ordered = this.orderItems(listing);

			// Get the lowest priced item
			const lowest = listing[0]['priceInGHST'];
			// Get the second lowest priced item
			const secondLowest = listing[1]['priceInGHST'];
			const diff = ((secondLowest - lowest) / secondLowest) * 100;

			// Only add it to the list if the difference is over a certain amount (25)
			if (diff >= this.state.values.valueDifference) {
				// Cut down the list
				const orderedSlice = ordered.slice(0, 5);
	
				// Add the ordered items to the item object
				orderedListings[item] = orderedSlice;
			}
		}

		return orderedListings;
	};
	
	async getListings() {
		/**
		 * Looked to set the getListings _length with the amount of add listing events
		 * However, it's both too slow, and the result is too large
		 * The given number cause a MetaMask crash. It can't estimate gas
		 * 
		 * const listingAddEvent = this.aavegotchiContract.filters.ERC1155ListingAdd();
		 * const listingCount = await this.aavegotchiContract.queryFilter(listingAddEvent);
		 */

		// Get the grouped listings
		const grouped = this.groupListings();

		// Order each group
		const orderListings = await this.orderGroupedListings(grouped);

		// Set the state
		this.setState({listings: orderListings})
	}

	handleOptionsSubmit(e) {
		e.preventDefault();

		const newCategory = parseInt(e.target.category.value);
		const newDifference = parseInt(e.target.difference.value);

		this.setState({
			values: {
				category: newCategory,
				valueDifference: newDifference,
			},
			listings: undefined,
		},
		this.getListings);
	}

	render() {
		if (!this.state.listings) {
			return (
				<>
					<Header />
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} />
					<Loading />
				</>
			);
		}
		else if (Object.keys(this.state.listings).length) {
			return (
				<>
					<Header />
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this} />
					<Listings listings={this.state.listings} contract={this.aavegotchiContract} />
				</>
			)
		}

		return (
			<>
				<Header />
				<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this} />
				<NoListings />
			</>
		);
	}
}



