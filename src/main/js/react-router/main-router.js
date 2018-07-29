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

        this.renewAuthentication = this.renewAuthentication.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getArtistCollections = this.getArtistCollections.bind(this);
    }

    componentDidMount() {

        this.renewAuthentication();
        this.getArtistCollections();
    }

    getCurrentUser() {

        let authentication = AuthenticationService.getCurrentUser();

        this.setState({
            authentication: {
                username: authentication.username,
                jwt: authentication.jwt
            }
        });
    }

    renewAuthentication() {

        AuthenticationService.renewToken()
            .then(() => {

                this.getCurrentUser();
                this.getArtistCollections();
            })
            .catch(() => {

                AuthenticationService.logout();

                this.getCurrentUser();
            });
    }

    getArtistCollections() {

        ApiClientService.getArtistCollections()
            .catch(response => {

            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    artistCollections: json
                });
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
                                                   getArtistCollections={this.getArtistCollections} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter