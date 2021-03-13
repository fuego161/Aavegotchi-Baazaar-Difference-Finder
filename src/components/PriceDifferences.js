import { Component } from 'react';
import { BigNumber } from 'ethers';
import { Options } from './Options';
import { Loading } from './Loading';
import { NoListings } from './NoListings';
import Contract from './Contract';

export class PriceDifferences extends Component {
	_mounted = false;

	constructor(props) {
		super(props);

		// Get the connection
		this.connection = Contract.CONNECTION;

		// Bind form handler this
		this.handleOptionsSubmit = this.handleOptionsSubmit.bind(this);

		// Set the value to divide the price in wei by
		this.divideBy = BigNumber.from('1000000000000000000');

		// Set the state
		this.state = {
			values: {
				category: 0,
				valueDifference: 25,
			},
			listings: undefined,
			tables: undefined,
		};
	}

	componentDidMount() {
		this._mounted = true;
		this.outputListings();
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	orderItems(listing) {
		return listing.sort((a, b) => a['priceInGHST'] - b['priceInGHST']);
	}

	async groupListings() {
		// Get the listings in the baazaar
		const listings = await this.connection.getERC1155Listings(
			this.state.values.category,
			'listed',
			1500
		);

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
			const formattedPriceInWei = priceInWei.div(this.divideBy);
			// We know this will be a safe low number now
			const priceInGHST = formattedPriceInWei.toNumber();

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
		 * const listingAddEvent = this.connection.filters.ERC1155ListingAdd();
		 * const listingCount = await this.connection.queryFilter(listingAddEvent);
		 */

		// Get the grouped listings
		const grouped = this.groupListings();

		// Order each group
		const orderListings = await this.orderGroupedListings(grouped);

		return orderListings;
	}

	async outputListings() {
		const data = await this.getListings();

		// If there's no data returned (nothing made it through the price difference check)
		// Set the tables to an empty obj and break
		if (!Object.keys(data).length) {

			if (this._mounted) {
				this.setState({
					tables: {},
				});
			}

			return;
		}

		// Set an array to store the results
		const results = [];

		for (const [item, listings] of Object.entries(data)) {
			const tableRows = [];

			for (const listing of listings) {
				const { listingId, priceInGHST } = listing;

				const row = (
					<tr key={listingId}>
						<td><a href={`https://aavegotchi.com/baazaar/erc1155/${listingId}`} target="_blank" rel="noreferrer">{listingId}</a></td>
						<td>{priceInGHST}</td>
					</tr>
				);

				tableRows.push(row);
			}

			// Get items name
			const itemDetails = await this.connection.getItemType(item);
			const name = itemDetails[0];

			const table = (
				<div className="listings__card card" key={item}>

					<h2 className="card__title">{name} <small>({item})</small></h2>

					<table className="card__table">
						<thead>
							<tr>
								<th>Listing</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{tableRows}
						</tbody>
					</table>

				</div>
			);

			results.push(table);

			if (this._mounted) {
				this.setState({
					tables: results,
				});
			}
		}
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
			tables: undefined,
		},
		this.outputListings);
	}

	render() {
		if (!this.state.tables) {
			return (
				<>
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} view={this.props.view} />
					<Loading />
				</>
			);
		} else if (Object.keys(this.state.tables).length) {
			return (
				<>
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} view={this.props.view} />
					<div className="listings">{this.state.tables}</div>
				</>
			);
		}
		
		return (
			<>
				<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} view={this.props.view} />
				<NoListings />
			</>
		);
	}
}