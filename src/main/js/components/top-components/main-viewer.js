import React from "react";
import { Route, Redirect } from "react-router";
import ViewerRoutes from "routes/viewer-routes";

class MainViewer extends React.Component {

    render() {

        return (
            <div className="wrap main-viewer-component-wrap">
                <ViewerRoutes {...this.props} />
            </div>
        );
    }
}


export default MainViewer