import React from "react";
import MainNav from "components/top-components/main-nav";
import AuthenticationNav from "components/viewer-components/authentication/authentication-nav";

const MainHeader = (props) => (

    <header className="main-header">

        <div>
            <h1> anvil </h1>
            <h2> a music database manager </h2>
        </div>

        <div className="authentication-nav-wrap">
            <AuthenticationNav {...props} />
        </div>

        <div>
            <MainNav {...props} />
        </div>

    </header>
);

export default MainHeader