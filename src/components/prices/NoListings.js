import { Component } from 'react';

export class NoListings extends Component {
	render() {
		return (
			<>
				<div className="listings listings--none">
					<p className="listings__warning">There were no listings found.<br /> Try making your Percentage Difference smaller.</p>
				</div>
			</>
		)
	}
}