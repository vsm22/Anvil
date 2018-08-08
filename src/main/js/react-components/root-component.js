import React from "react";
import { Route } from "react-router";
import HeaderComponent from "./top-components/header-component";
import SearchBarComponent from "./top-components/search-bar-component";
import MainViewerComponent from "./top-components/main-viewer-component";
import DevViewerComponent from "./viewer-components/dev-viewer-component";
import BackgroundAnimationComponent from "./background-animation-component";

class RootComponent extends React.Component {

    render() {

        let props = this.props;

        return (

            <div className="wrap root-component-wrap" id="root-component-wrap">
                {/* <BackgroundAnimationComponent {...props} /> */}
                <HeaderComponent {...props} />

                <Route path={new RegExp("^(?:(?!/register|/login)).*$")} render={(routeProps) =>
                    <SearchBarComponent {...Object.assign({}, props, routeProps)} />
                } />

                <Route path={new RegExp(".*")} render={(routeProps) =>
                    <MainViewerComponent {...Object.assign({}, props, routeProps)} />
                } />
            </div>
        );
    }
}

export default RootComponent