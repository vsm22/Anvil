import React from "react";
import { Route } from "react-router-dom";
import ArtistSearchResultViewerComponent from "components/viewer-components/artist-search-result-viewer-component";
import ArtistInfoViewerComponent from "components/viewer-components/artist-info-viewer-component";
import SpinnerComponent from "components/viewer-components/spinner-component";
import DevViewerComponent from "components/viewer-components/dev-viewer-component";
import LoginViewerComponent from "components/viewer-components/login-viewer-component";
import LogoutViewerComponent from "components/viewer-components/logout-viewer-component";
import RegistrationViewerComponent from "components/viewer-components/registration-viewer-component";
import CreateArtistCollectionComponent from "components/viewer-components/create-artist-collection-component";
import GetArtistCollectionsComponent from "components/viewer-components/get-artist-collections-component";

const ViewerRoutes = (props) => {

    return (

        <div>

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

            <Route path="/createArtistCollection"
                render={(routeProps) => <CreateArtistCollectionComponent {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/getArtistCollections"
                render={(routeProps) => <GetArtistCollectionsComponent {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/collections"
                render={(routeProps) => <CollectionsViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/favorites"
                render={(routeProps) => <FavoritesViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/friends"
                render={(routeProps) => <FriendsViewer {...Object.assign({}, props, routeProps)} /> }
            />

        </div>
    );
};

export default ViewerRoutes