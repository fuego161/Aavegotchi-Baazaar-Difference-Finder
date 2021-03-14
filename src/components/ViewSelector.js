import { Component } from 'react';
import { Views } from './Views';
import '../scss/view-selector.scss';

export class ViewSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'price-differences',
		};

		this.views = [
			{
				label: 'Price Difference Finder',
				value: 'price-differences',
			},
			{
				label: 'Baazaar Filtering',
				value: 'filtering',
			},
		];

		this.handleViewSwitch = this.handleViewSwitch.bind(this);
	}

	handleViewSwitch(e) {
		e.preventDefault();

		const { view } = e.target.dataset;

		this.setState({ view });
	}

	render() {
		return (
			<>
				<div className="views">
					{this.views.map((view) => (
						<button
							key={view.value}
							className="views__selector btn"
							data-view={view.value}
							onClick={this.handleViewSwitch}
						>
							{view.label}
						</button>
					))}
				</div>
				{this.state.view && <Views view={this.state.view} />}
			</>
		)
	}
}