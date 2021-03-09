import { Component } from 'react';

export class Loading extends Component {
	render() {
		return (
			<>
				<div className="listings listings--none">
					<p className="listings__loading">Loading...</p>
				</div>
			</>
		)
	}
}
