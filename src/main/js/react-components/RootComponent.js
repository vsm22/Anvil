import React from "react";
import HeaderComponent from "./HeaderComponent";
import SearchComponent from "./SearchComponent";
import SearchResultViewerComponent from "./SearchResultViewerComponent";
import ArtistInfoViewerComponent from "./ArtistInfoViewerComponent";
import DevViewerComponent from "./DevViewerComponent";

"use strict";

function RootComponent(props) {
		return (
			<div>
				<HeaderComponent {...props} />
				<SearchComponent {...props} />
				<SearchResultViewerComponent {...props} />
				<ArtistInfoViewerComponent {...props} />
				<DevViewerComponent {...props} />
			</div>
		);
}


export default RootComponent
