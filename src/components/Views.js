import { Component } from 'react';
import { PriceDifferences } from './PriceDifferences';
import { Filtering } from './Filtering';

export class Views extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.view === 'price-differences') {
			return <PriceDifferences />
		}
		else if (this.props.view === 'filtering') {
			return <Filtering />
		}
	}
}