import React from "react";
import DispatcherActions from "../flux-dispatcher/DispatcherActions";
import ArtistSearchService from "../services/ArtistSearchService";

"use strict";

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.setSearchQuery = this.setSearchQuery.bind(this);
		this.initArtistSearch = this.initArtistSearch.bind(this);
	}

	setSearchQuery(event) {
		event.preventDefault();
		DispatcherActions.setSearchQuery(event.target.value);
	}

	initArtistSearch(event) {
		event.preventDefault();
		let searchQuery = this.props.searchQuery;
		DispatcherActions.initArtistSearch(searchQuery);
	}

	render() {
		return (
			<form name="mainSearchForm" id="main-search-form">
				<input type="text" name="mainSearchFormTextInput" id="main-search-form-text-input"
					placeholder="search artist name"
					onChange={this.setSearchQuery} />
				<button id="main-search-form-submit-button" onClick={this.initArtistSearch} />
			</form>
		);
	}
}

export default SearchComponent
