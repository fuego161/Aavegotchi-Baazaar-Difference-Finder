import { Component } from 'react';
import './intro.scss';

export class Intro extends Component {
	render() {
		return (
			<>
				<div className="intro">
					<p className="intro__text">This app is built to help you find deals within the Aavegotchi Baazaar. There are two tools within this app. Toggle between these with the two buttons above, and see an overview of them below</p>

					<div className="intro__box">
						<h2>Price Difference Finder</h2>
						<p>The idea of this section is to find the cheapest two listings of an item. Once found, if the difference is above your selected "Percentage" the app will show a table containing the five cheapest items.</p>
						<p>This helps you find the individual floors of items, as well as if there's one sneakily cheaper than the rest.</p>
						<p>The price difference finder let's you select between either Wearables or Consumables. It also lets you filter by rarity.</p>
					</div>

					<div className="intro__box">
						<h2>Baazaar Filtering</h2>
						<p>This section allows you to choose between Closed Portals and Open Portals (Gothci's too once I sort out some issues), and filter the visibility and order.</p>
						<p>Visibility allows you choose to show "All the listings", "Listings only showing on the Baazaar" or "Listings excluding those on the Baazaar". From here you can then select which order to show the listings, these orders are "Recent", "Ascending" price, or "Descending".</p>
						<p>A good use case for this is checking to see for any Closed Portals from only listings which fell from the Baazaar, ordered by cheapest first. You can then see if there's and deals to be snapped up and click on a portal to open the Baazaar page on the Aavegotchi site.</p>
					</div>
				</div>
			</>
		)
	}
}
