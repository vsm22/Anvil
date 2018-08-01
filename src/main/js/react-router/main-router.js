import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "../react-components/root-component";
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
    }

    componentDidMount() {

        this.getCurrentUser();
    }

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

    getArtistCollections() {

        ApiClientService.getArtistCollections()
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    artistCollections: json
                });
            }).catch(response => {
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
                                                   ensureAuthentication={this.ensureAuthentication} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter