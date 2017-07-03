import React from "react";

"use strict";

class SearchComponent extends React.Component {
	constructor() {
		super();
	}
	
	requestSearch() {
		console.log("search requested");
	}
	
	render() {
		return (
			<form name="mainSearchForm" id="main-search-form" onSubmit={this.requestSearch}>
				<input type="text" name="mainSearchFormTextInput" id="main-search-form-text-input" placeholder="search artist, album, track, or genre"/>
				<input type="submit" id="main-search-form-submit-button" value={"\uf002"}/>
			</form>
		);
	}
}

export default SearchComponent