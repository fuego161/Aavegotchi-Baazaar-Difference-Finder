import { Component } from 'react';
import { Intro } from './layout/Intro';
import { PriceDifferences } from './prices/PriceDifferences';
import { Filtering } from './filtering/Filtering';

export class Views extends Component {
	render() {
		switch (this.props.view) {
			case 'price-differences':
				return <PriceDifferences view={this.props.view} />;
			case 'filtering':
				return <Filtering view={this.props.view} />;
			default:
				return <Intro />;
		}
	}
}