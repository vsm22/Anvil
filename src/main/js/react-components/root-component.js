import React from "react";
import {Route} from "react-router";

import HeaderComponent from "./top-components/header-component";
import SearchBarComponent from "./top-components/search-bar-component";
import MainViewerComponent from "./top-components/main-viewer-component";
import DevViewerComponent from "./viewer-components/dev-viewer-component";

const RootComponent = (props) => (
			<div className="wrap root-component-wrap">
				<HeaderComponent {...props} />
				<SearchBarComponent {...props} />
				<MainViewerComponent {...props} />
			</div>
);

export default RootComponent
