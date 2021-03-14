import { Component } from 'react';
import '../scss/options.scss';

export class Options extends Component {
	constructor(props) {
		super(props);

		this.values = this.props.values;
		this.view = this.props.view;

		this.PriceDifferenceOptions = this.PriceDifferenceOptions.bind(this);
		this.FilteringOptions = this.FilteringOptions.bind(this);
	}

	SelectFields(props) {
		return (
			<label className="form__label">
				<p>{props.label}:</p>

				<select
					name={props.name}
					className="form__input form__input--select"
					defaultValue={props.initialValue}
				>
					{props.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		);
	}

	PriceDifferenceOptions(props) {
		const categoryOptions = [
			{
				label: 'Wearable',
				value: '0',
			},
			{
				label: 'Consumable',
				value: '2',
			},
		];

		return (
			<>
				<this.SelectFields
					label="Collections"
					name="category"
					options={categoryOptions}
					initialValue={props.initialValue}
				/>
				<label className="form__label">
					Percentage Difference:

					<input
						name="difference"
						className="form__input"
						type="number"
						min="0"
						max="99"
						defaultValue={this.values.valueDifference}
					/>
				</label>
			</>
		);
	}

	FilteringOptions(props) {
		const categoryOptions = [
			{
				label: 'Closed Portal',
				value: '0',
			},
			{
				label: 'Open Portal',
				value: '2',
			},
			// {
			// 	label: 'Aavegotchi',
			// 	value: '3',
			// },
		];

		const visibilityOptions = [
			{
				label: 'All',
				value: '0',
			},
			{
				label: 'Exclude Baazaar',
				value: '1',
			},
			{
				label: 'Baazaar Only',
				value: '2',
			},
		];

		const orderOptions = [
			{
				label: 'Recent',
				value: '0',
			},
			{
				label: 'Ascending',
				value: '1',
			},
			{
				label: 'Descending',
				value: '2',
			},
		];

		return (
			<>
				<this.SelectFields
					name="category"
					label="Type"
					options={categoryOptions}
					initialValue={props.initialValues.category}
				/>
				<this.SelectFields
					name="visibility"
					label="Visibility"
					options={visibilityOptions}
					initialValue={props.initialValues.visibility}
				/>
				<this.SelectFields
					name="order"
					label="Order"
					options={orderOptions}
					initialValue={props.initialValues.visibility}
				/>
			</>
		);
	}

	render() {
		return (
			<div className="options">
				<form className="options__form form" onSubmit={this.props.handleOptionsSubmit}>

					{this.view === 'price-differences'
						? <this.PriceDifferenceOptions initialValue={this.values.category} />
						: <this.FilteringOptions initialValues={this.values} />
					}

					<input className="form__input form__input--submit" type="submit" value="Go" disabled={this.props.disabledSubmit} />

				</form>
			</div>
		);
	}
}