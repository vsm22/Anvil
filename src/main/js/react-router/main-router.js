import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect, browserHistory } from "react-router";
import RootComponent from "../react-components/root-component";
import ApplicationStateTypes from "../flux/flux-data/application-state-types";
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
    }

    componentDidMount() {

        this.renewAuthentication();

    }

    renewAuthentication() {

        const _this = this;

        console.log("going to renew authentication...");

        AuthenticationService.renewToken()
            .then(json => {

                console.log("Received new authentication! Username: " + json.username + " , token: " + json.token);


                _this.setState({
                    authentication: {
                        username: json.username,
                        jwt: json.token
                    }
                });
            })
            .catch(() => {

                AuthenticationService.logout();

                _this.setState({
                    authentication: {
                        username: null,
                        jwt: null
                    }
                })
            });
    }

    render() {

        let props = this.props;

        return (

            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <RootComponent {...props} />} />
                </div>
            </BrowserRouter>

        );
    }
}

export default MainRouter