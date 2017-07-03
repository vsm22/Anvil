import React from "react";
import HeaderComponent from "./HeaderComponent";
import MainViewerComponent from "./MainViewerComponent";
import SearchComponent from "./SearchComponent";

"use strict";

class RootComponent extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div>
				<HeaderComponent />
				<SearchComponent />
				<MainViewerComponent />
			</div>
		);
	}
}

export default RootComponent