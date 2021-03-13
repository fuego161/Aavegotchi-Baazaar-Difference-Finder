import { Component } from 'react';
import { PriceDifferences } from './PriceDifferences';
import { Filtering } from './Filtering';

export class Views extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.view === 'price-differences') {
			return <PriceDifferences view={this.props.view} />
		}
		else if (this.props.view === 'filtering') {
			return <Filtering view={this.props.view} />
		}
	}
}