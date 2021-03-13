import { Component } from 'react';
import { ReactComponent as GhstToken } from '../../svg/ghst-token.svg';

export class AavegotchiCard extends Component {
	constructor(props) {
		super(props);

		this.data = [
			{
				label: 'Rarity Score:',
				value: `${this.props.formattedMRS} (${this.props.formattedBRS})`,
			},
			{
				label: 'Level:',
				value: this.props.formattedLevel,
			},
			{
				label: 'Kinship:',
				value: this.props.formattedKinship,
			},
			{
				label: 'Haunt:',
				value: this.props.hauntId,
			},
		];
	}

	render() {
		return (
			<a
				className="filtering__card card card--aavegotchi"
				href={`https://aavegotchi.com/baazaar/erc721/${this.props.listingId}`}
				rel="noreferrer"
				target="_blank"
			>

				<div className="card__header">
					<h2 className="card__name">
						{this.props.name} <small>({this.props.formattedTokenId})</small>
					</h2>

					<div className="card__price">
						<GhstToken />
						<p>{this.props.priceInGHST}</p>
					</div>
				</div>

				<div className="card__data">

					{this.data.map((data) => (
						<div className="data" key={data.value}>

							<p className="key">
								{data.label}
							</p>

							<p className="value">
								{data.value}
							</p>

						</div>
					))}

				</div>

			</a>
		);
	}
}