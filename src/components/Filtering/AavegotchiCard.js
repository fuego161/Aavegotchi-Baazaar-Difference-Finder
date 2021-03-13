import { Component } from 'react';
import { ReactComponent as GhstToken } from '../../svg/ghst-token.svg';
import Contract from '../Contract';

export class AavegotchiCard extends Component {
	constructor(props) {
		super(props);

		this.listingId = props.listingId;
		this.priceInGHST = props.priceInGHST;
		this.category = props.category;
	}

	render() {
		return (
			<a
				className="filtering__card card card--aavegotchi"
				href={`https://aavegotchi.com/baazaar/erc721/${this.listingId}`}
				rel="noreferrer"
				target="_blank"
			>

				<div className="card__img">
					
				</div>

				<div className="card__price">
					<GhstToken />
					<p>{this.priceInGHST}</p>
				</div>

			</a>
		);
	}
}