import { Component } from 'react';

export class Listings extends Component {
	constructor(props) {
		super(props);

		this.contract = this.props.contract;

		this.state = {
			tables: undefined,
		};
	}

	componentDidMount() {
		this.outputListings();
	}

	async outputListings() {
		const data = this.props.listings;

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
			const itemDetails = await this.contract.getItemType(item);
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

			this.setState({
				tables: results,
			});
		}

	}

	render() {
		return (
			<div className="listings">{this.state.tables}</div>
		);
	}
}