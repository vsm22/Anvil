import React from "react";
import { Route } from "react-router";
import MainHeader from "components/top-components/main-header";
import MainSearchBar from "components/top-components/main-search-bar";
import MainViewer from "components/top-components/main-viewer";
import MainBackground from "components/top-components/main-background";

class TopLayout extends React.Component {

    render() {

        return (

            <div className="wrap root-component-wrap" id="root-component-wrap">

                {/* FIXME: <MainBackground {...this.props} /> */}

                <MainHeader {...this.props} />

                <Route path={new RegExp("^(?:(?!/register|/login)).*$")} render={(routeProps) =>
                    <MainSearchBar {...Object.assign({}, this.props, routeProps)} />
                } />

                <Route path={new RegExp(".*")} render={(routeProps) =>
                    <MainViewer {...Object.assign({}, this.props, routeProps)} />
                } />

            </div>

        );
    }
}

export default TopLayout