import { Component } from 'react';
import { Header } from './Header';
import { ViewSelector } from './ViewSelector';
import { Footer } from './Footer';

export class Dapp extends Component {
	render() {
		return (
			<>
				<Header />
				<ViewSelector />
				<Footer />
			</>
		);
	}
}



