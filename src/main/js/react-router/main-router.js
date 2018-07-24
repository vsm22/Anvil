import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "../react-components/root-component";
import AuthenticationService from "services/authentication-service";

class MainRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authentication: {
                username: null,
                jwt: null
            }
        }

        this.renewAuthentication = this.renewAuthentication.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {

        this.renewAuthentication();

    }

    getCurrentUser() {

        let authentication = AuthenticationService.getCurrentUser();

        console.log("Get current user... | username: " + authentication.username + " | jwt: " + authentication.jwt)

        this.setState({
            authentication: {
                username: authentication.username,
                jwt: authentication.jwt
            }
        });
    }

    renewAuthentication() {

        const _this = this;

        AuthenticationService.renewToken()
            .then(() => {

                _this.getCurrentUser();
            })
            .catch(() => {

                AuthenticationService.logout();

                _this.getCurrentUser();
            });
    }

    render() {

        const _this = this;
        let props = this.props;

        console.log("Rerendering main router...");

        return (

            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <RootComponent {...props}
                                                   authentication={_this.state.authentication}
                                                   renewAuthentication={_this.renewAuthentication}
                                                   getCurrentUser={_this.getCurrentUser} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter