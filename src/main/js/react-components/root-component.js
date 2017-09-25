import React from "react";
import {Route} from "react-router";
import HeaderComponent from "./top-components/header-component";
import SearchBarComponent from "./top-components/search-bar-component";
import MainViewerComponent from "./top-components/main-viewer-component";
import DevViewerComponent from "./viewer-components/dev-viewer-component";
import BackgroundAnimationComponent from "./background-animation-component";

const RootComponent = (props) => (
			<div className="wrap root-component-wrap" id="root-component-wrap">
				<BackgroundAnimationComponent {...props} />
				<HeaderComponent {...props} />
				<SearchBarComponent {...props} />
				<MainViewerComponent {...props} />
			</div>
);

export default RootComponent
