import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "../react-components/root-component";
import AuthenticationService from "services/authentication-service";
import ApiClientService from "services/api-client-service";
import ArtistSearchResultViewerComponent from "components/viewer-components/artist-search-result-viewer-component";
import ArtistInfoViewerComponent from "components/viewer-components/artist-info-viewer-component";
import SpinnerComponent from "components/viewer-components/spinner-component";
import DevViewerComponent from "components/viewer-components/dev-viewer-component";
import LoginViewerComponent from "components/viewer-components/login-viewer-component";
import LogoutViewerComponent from "components/viewer-components/logout-viewer-component";
import RegistrationViewerComponent from "components/viewer-components/registration-viewer-component";
import CreateArtistCollectionComponent from "components/viewer-components/create-artist-collection-component";
import GetArtistCollectionsComponent from "components/viewer-components/get-artist-collections-component";

class MainRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authentication: {
                username: null,
                jwt: null
            },
            artistCollections: [{}]
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getArtistCollections = this.getArtistCollections.bind(this);
        this.setArtistCollections = this.setArtistCollections.bind(this);
    }

    componentDidMount() {

        this.getCurrentUser();
    }

    /**
     * Get the current user (username and token).
     * Attempt to get logged-in (registered) user info from localStorage.
     * If unavailable, attempt to get guest user info from sessionStorage.
     * If unavailable, get a guest token from the server and store it in sessionStorage.
     */
    getCurrentUser() {

        return new Promise((resolve, reject) => {

            AuthenticationService.getCurrentUser()
                .then(user => {

                    this.setState({
                        authentication: {
                            username: user.username,
                            jwt: user.jwt
                        }
                    });

                    return resolve(user);
                })
                .catch(user => {

                    this.setState({
                        authentication: {
                            username: null,
                            jwt: null
                        }
                    });

                    return reject(user);
                });
        });
    }

    /**
     * Get artist collections via call to the api service.
     */
    getArtistCollections() {

        ApiClientService.getArtistCollections()
            .then(response => {
                return response.json();
            })
            .then(json => {

                this.setArtistCollections(json);

            }).catch(response => {
            });
    }

    /**
     * Set artist collections in the root component state.
     */
    setArtistCollections(json) {

        this.setState({
            artistCollections: json
        });
    }

    render() {

        const viewerRoutes = (

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

        return (

            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <RootComponent {...this.props}
                                                   authentication={this.state.authentication}
                                                   renewAuthentication={this.renewAuthentication}
                                                   getCurrentUser={this.getCurrentUser}
                                                   artistCollections={this.state.artistCollections}
                                                   getArtistCollections={this.getArtistCollections}
                                                   ensureAuthentication={this.ensureAuthentication}
                                                   setArtistCollections={this.setArtistCollections}
                                                   viewerRoutes={viewerRoutes} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter