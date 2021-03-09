import { Component } from 'react';

export class Options extends Component {
	constructor(props) {
		super(props);

		this.values = this.props.values;

		this.categoryOptions = [
			{
				label: 'Wearable',
				value: '0',
				erc: '1155',
			},
			{
				label: 'Consumable',
				value: '2',
				erc: '1155',
			},
		];
	}

	render() {
		return (
			<div className="options">
				<form className="options__form" onSubmit={this.props.handleOptionsSubmit}>

					<label>
						<p>Collections:</p>

						<select
							name="category"
							className="options__input options__input--select"
							defaultValue={this.values.category}
						>
							{this.categoryOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</label>

					<label>
						Percentage Difference:

						<input
							name="difference"
							className="options__input"
							type="number"
							min="0"
							max="99"
							defaultValue={this.values.valueDifference}
						/>
					</label>

					<input className="options__input options__input--submit" type="submit" value="Search"/>

				</form>
			</div>
		);
	}
}