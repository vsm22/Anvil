import React from "react"

"use strict";

class HeaderComponent extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<header>
				<h1> scrobbletree </h1>
				<h2> a tool for music exploration </h2>
			</header>
		);
	}
}

export default HeaderComponent