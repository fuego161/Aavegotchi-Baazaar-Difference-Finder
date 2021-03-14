import { Component } from 'react';
import { PriceDifferences } from './prices/PriceDifferences';
import { Filtering } from './filtering/Filtering';

export class Views extends Component {
	render() {
		if (this.props.view === 'price-differences') {
			return <PriceDifferences view={this.props.view} />
		}
		else if (this.props.view === 'filtering') {
			return <Filtering view={this.props.view} />
		}
	}
}