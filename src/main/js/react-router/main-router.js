import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "../react-components/root-component";
import ApplicationStateTypes from "../flux/flux-data/application-state-types";

/**
 * Note: the Main Router declares the possible routes and renders the Root Component.
 * The actual sub-component-rendering logic is handled inside the sub-components.
 * i.e. the Main Viewer component.
 */
function MainRouter(props) {

    return (

        <BrowserRouter>
            <div>
                <Route path="/" render={() => <RootComponent {...props} />} />
                <Route path="/artistSearch" render={() => <RootComponent {...props} />} />
                <Route path="/artistInfo" render={() => <RootComponent {...props} />} />
                <Route path="/register" render={() => <RootComponent {...props} />} />
            </div>
        </BrowserRouter>

    );
}

export default MainRouter