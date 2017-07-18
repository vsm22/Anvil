import React from "react";

class DevViewerComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>artistSearchResults:</h1> <p>{JSON.stringify(this.props.artistSearchResult)}</p>
				<h1>artistInfo:</h1> <p> {JSON.stringify(this.props.artistInfo)}</p>
			</div>
		);
	}
}

export default DevViewerComponent
