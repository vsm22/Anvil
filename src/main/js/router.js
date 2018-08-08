import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "components/root-component";
import AuthenticationService from "services/authentication-service";
import ApiClientService from "services/api-client-service";

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
                                                   setArtistCollections={this.setArtistCollections} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter