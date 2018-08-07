import React from "react";
import { Route, Redirect } from "react-router";

class MainViewerComponent extends React.Component {

    render() {

        const props = this.props;

        return (
            <div className="wrap main-viewer-component-wrap">
                { this.props.viewerRoutes }
            </div>
        );
    }
}


export default MainViewerComponent