import React from "react";
import MainNav from "components/top-components/main-nav";
import AuthenticationNav from "components/viewer-components/authentication/authentication-nav";

const MainHeader = (props) => (

    <header>

        <div>
            <h1> anvil </h1>
            <h2> a tool for music exploration </h2>
        </div>

        <div>
            <AuthenticationNav {...props} />
        </div>

        <div>
            <MainNav {...props} />
        </div>

    </header>
);

export default MainHeader