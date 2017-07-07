import React from "react";

"use strict";

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);	
		this.state = { 
			searchQuery: "",
			searchResponse: "" 
		};
		
		this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
		this.requestSearch = this.requestSearch.bind(this);
	}
	
	requestSearch(event) {
		let _this = this;
		
		event.preventDefault();
		
		let searchQuery = this.state.searchQuery;
		let xhr = new XMLHttpRequest();
		let searchRequestUrl = "./search?searchQuery=" + searchQuery;
		
		xhr.open("GET", searchRequestUrl, true);
		xhr.onreadystatechange = function() {
			if (/2\d\d/.test(xhr.status.toString)) {
				_this.setState({ searchResponse: xhr.responseText });
			}
		}
		
		xhr.send();
	}

	handleSearchQueryChange(event) {
		this.setState({ searchQuery: event.target.value });
	}
	
	render() {
		return (
			<form name="mainSearchForm" id="main-search-form">
				<input type="text" name="mainSearchFormTextInput" id="main-search-form-text-input" 
					placeholder="search artist, album, track, or genre"
					onChange={ this.handleSearchQueryChange } />
				<button id="main-search-form-submit-button" value={"\uf002"} onClick={ this.requestSearch } />
				<p> { this.state.searchResponse } </p>
			</form>
		);
	}
}

export default SearchComponent