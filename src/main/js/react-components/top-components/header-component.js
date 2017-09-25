import React from "react";
import BackgroundAnimationComponent from "../background-animation-component";

const HeaderComponent = (props) => (
		<header>
			<BackgroundAnimationComponent {...props} />
			<h1> scrobbletree </h1>
			<h2> a tool for music exploration </h2>
		</header>
);

export default HeaderComponent
