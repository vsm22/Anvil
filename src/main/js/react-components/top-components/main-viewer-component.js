import React from "react";
import { Route, Redirect } from "react-router";
import ViewerRoutes from "routes/viewer-routes";

class MainViewerComponent extends React.Component {

    render() {

        console.log(this.props.history);

        return (
            <div className="wrap main-viewer-component-wrap">
                <ViewerRoutes {...this.props} />
            </div>
        );
    }
}


export default MainViewerComponent