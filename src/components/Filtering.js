import { Component } from 'react';
import { BigNumber } from 'ethers';
import { Options } from './Options';
import { Loading } from './Loading';
import { PortalCard } from './Filtering/PortalCard';
import { AavegotchiCard } from './Filtering/AavegotchiCard';
import Contract from './Contract';

/**
 * Visibility values
 * 0 = All listings
 * 1 = Exclude the listings showing in the baazaar
 * 2 = Only show the listings showing in the baazaar
 */

export class Filtering extends Component {
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
				visibility: 0,
				order: 0,
			},
			listings: undefined,
			output: undefined,
		};
	}

	componentDidMount() {
		this._mounted = true;
		this.outputListings();
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	orderAscending(listing) {
		return listing.sort((a, b) => a['priceInGHST'] - b['priceInGHST']);
	}

	orderDescending(listing) {
		return listing.sort((a, b) => b['priceInGHST'] - a['priceInGHST']);
	}

	async formatListings(listings) {
		const formattedListings = [];

		for (const listing of listings) {
			const { listingId, priceInWei } = listing;

			// We know these numbers are safe for JS, so convert them
			const formattedListingId = listingId.toNumber();
	
			// Divide the price in wei to get the value in GHST
			const formattedPriceInWei = priceInWei.div(this.divideBy);
			// We know this will be a safe low number now
			const priceInGHST = formattedPriceInWei.toNumber();

			formattedListings.push({
				listingId: formattedListingId,
				priceInGHST,
			});
		}

		return formattedListings;
	}

	async getListings() {
		// Get the listings in the baazaar
		const listings = await this.connection.getERC721Listings(
			this.state.values.category,
			'listed',
			3000
		);

		// Format the listings is a way that can be human read
		const formattedListings = await this.formatListings(listings);

		return formattedListings;
	}

	async outputListings() {
		// Get the listings
		const listings = await this.getListings();
		// Set the amount of items shown in the baazaar
		const baazaarListingCount = 90;
		// Set whether or not an Aavegotchi
		const isAavegotchi = this.state.values.category === 3;

		// Set array to store the sliced listings (from visibility)
		let slicedListings = [];
		// Set array to store the ordered listings (from order)
		let orderedListings = [];

		// Set an array to store the results
		const results = [];

		switch (this.state.values.visibility) {
			case 1:
				slicedListings = listings.slice(baazaarListingCount);
				break;
			case 2:
				slicedListings = listings.slice(0, baazaarListingCount);
				break;
			default:
				slicedListings = listings;
				break;
		}

		switch (this.state.values.order) {
			case 1:
				orderedListings = this.orderAscending(slicedListings);
				break;
			case 2:
				orderedListings = this.orderDescending(slicedListings);
				break;
			default:
				orderedListings = slicedListings;
				break;
		}

		for (const listing of orderedListings) {
			const { listingId, priceInGHST } = listing;

			if (isAavegotchi) {
				const props = {
					listingId,
					priceInGHST,
					key: listingId,
				};

				const item = <AavegotchiCard {...props} />;
				results.push(item);

				if (this._mounted) {
					this.setState({
						output: results,
					});
				}
			}
			else {
				const props = {
					listingId,
					priceInGHST,
					category: this.state.values.category,
					key: listingId,
				};

				const item = <PortalCard {...props} />;
				results.push(item);
			}
		}

		if (this._mounted && !isAavegotchi) {
			this.setState({
				output: results,
			});
		}
	}

	handleOptionsSubmit(e) {
		e.preventDefault();

		const newCategory = parseInt(e.target.category.value);
		const newVisibility = parseInt(e.target.visibility.value);
		const newOrder = parseInt(e.target.order.value);

		this.setState({
			values: {
				category: newCategory,
				visibility: newVisibility,
				order: newOrder,
			},
			listings: undefined,
			output: undefined,
		},
		this.outputListings);
	}

	render() {
		if (!this.state.output) {
			return (
				<>
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} view={this.props.view} disabledSubmit={true} />
					<Loading />
				</>
			);
		} else if (this.state.output.length) {
			return (
				<>
					<Options handleOptionsSubmit={this.handleOptionsSubmit} values={this.state.values} view={this.props.view} />
					<div className="listings">{this.state.output}</div>
				</>
			);
		}
	}
}