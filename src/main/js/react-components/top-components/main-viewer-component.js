import React from "react";
import { Route, Redirect } from "react-router";
import ApplicationStateTypes from "../../flux/flux-data/application-state-types";
import ArtistSearchResultViewerComponent from "../viewer-components/artist-search-result-viewer-component";
import ArtistInfoViewerComponent from "../viewer-components/artist-info-viewer-component";
import SpinnerComponent from "../viewer-components/spinner-component";
import DevViewerComponent from "../viewer-components/dev-viewer-component";
import BackgroundBarsGraphicComponent from "../../graphics/background-bars-graphic-component";
import LoginViewerComponent from "../viewer-components/login-viewer-component";
import LogoutViewerComponent from "../viewer-components/logout-viewer-component";
import RegistrationViewerComponent from "../viewer-components/registration-viewer-component";
import NewUserArtistCollectionCollectionFormComponent from "../viewer-components/new-user-artist-collection-form-component";

class MainViewerComponent extends React.Component {

    render() {

        const props = this.props;

        return (

            <div className="wrap main-viewer-component-wrap">

                <Route path="/login"
                    render={(routeProps) => <LoginViewerComponent {...Object.assign({}, props, routeProps)} /> }
                />

                <Route path="/logout"
                    render={(routeProps) => <LogoutViewerComponent {...Object.assign({}, props, routeProps)} /> }
                />

                <Route path="/register"
                    render={(routeProps) => <RegistrationViewerComponent {...Object.assign({}, props, routeProps)} /> }
                />

                <Route path="/artistSearch"
                    render={(routeProps) => <ArtistSearchResultViewerComponent {...Object.assign({}, props, routeProps)} /> }
                />

                <Route path="/artistInfo"
                    render={(routeProps) => <ArtistInfoViewerComponent {...Object.assign({}, props, routeProps)} /> }
                />

                <Route path="/newUserArtistCollection"
                    render={(routeProps) => <NewUserArtistCollectionCollectionFormComponent {...Object.assign({}, props, routeProps)} /> }
                />

            </div>
        );
    }
}


export default MainViewerComponent