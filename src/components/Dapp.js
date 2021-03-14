import { Component } from 'react';
import { Header } from './layout/Header';
import { ViewSelector } from './ViewSelector';
import { Footer } from './layout/Footer';

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
