import React from "react";
import { Route } from "react-router-dom";
import ArtistSearchViewer from "components/viewer-components/artist-search/artist-search-viewer";
import ArtistInfoViewer from "components/viewer-components/artist-info/artist-info-viewer";
import LoginViewer from "components/viewer-components/authentication/login-viewer";
import LogoutViewer from "components/viewer-components/authentication/logout-viewer";
import RegistrationViewer from "components/viewer-components/authentication/registration-viewer";
import FriendsViewer from "components/viewer-components/friends/friends-viewer";
import RecommendationsViewer from "components/viewer-components/recommendations/recommendations-viewer";
import CollectionsViewer from "components/viewer-components/collections/collections-viewer";
import CollectionViewer from "components/viewer-components/collections/collection-viewer";

const ViewerRoutes = (props) => {

    return (

        <div>

            <Route path="/login"
                render={(routeProps) => <LoginViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/logout"
                render={(routeProps) => <LogoutViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/register"
                render={(routeProps) => <RegistrationViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/artistSearch"
                render={(routeProps) => <ArtistSearchViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/artistInfo"
                render={(routeProps) => <ArtistInfoViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/collections"
                render={(routeProps) => <CollectionsViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/collection"
                render={(routeProps) => <CollectionViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/favorites"
                render={(routeProps) => <FavoritesViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/friends"
                render={(routeProps) => <FriendsViewer {...Object.assign({}, props, routeProps)} /> }
            />

            <Route path="/recommendations"
                render={(routeProps) => <RecommendationsViewer {...Object.assign({}, props, routeProps)} /> }
            />

        </div>
    );
};

export default ViewerRoutes