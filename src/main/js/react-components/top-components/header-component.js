import React from "react";
import BackgroundAnimationComponent from "../background-animation-component";
import MainNavComponent from "../section-components/main-nav-component";
import LoginNavComponent from "../section-components/login-nav-component";

const HeaderComponent = (props) => (

    <header>

        <div>
            <h1> anvil </h1>
            <h2> a tool for music exploration </h2>
        </div>

        <MainNavComponent {...props} />
        <LoginNavComponent {...props} />

    </header>
);

export default HeaderComponent