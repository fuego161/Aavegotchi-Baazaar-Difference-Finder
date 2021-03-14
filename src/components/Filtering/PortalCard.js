import { Component } from 'react';
import { ReactComponent as ClosedPortal } from '../../svg/closed-portal.svg';
import { ReactComponent as OpenPortal } from '../../svg/open-portal.svg';
import { ReactComponent as GhstToken } from '../../svg/ghst-token.svg';

export class PortalCard extends Component {
	constructor(props) {
		super(props);

		this.listingId = props.listingId;
		this.priceInGHST = props.priceInGHST;
		this.category = props.category;
	}

	render() {
		return (
			<a
				className="filtering__card card card--filtering card--portal"
				href={`https://aavegotchi.com/baazaar/erc721/${this.listingId}`}
				rel="noreferrer"
				target="_blank"
			>

				<div className="card__img">
					{this.category === 0
						? <ClosedPortal />
						: <OpenPortal />
					}
				</div>

				<div className="card__price">
					<GhstToken />
					<p>{this.priceInGHST}</p>
				</div>

			</a>
		);
	}
}