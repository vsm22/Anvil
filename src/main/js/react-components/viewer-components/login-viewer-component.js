import React from "react";
import AuthenticationService from "services/authentication-service";
import { LOGIN_API_URL } from "config";

class LoginViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                username: "",
                password: ""
            },

            serverResponseBody: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

        const _this = this;

        event.preventDefault();
        event.stopPropagation();

        AuthenticationService.login(this.state.loginForm.username, this.state.loginForm.password)
            .then(() => {

                _this.props.getCurrentUser();
                _this.props.history.push("/");

            })
            .catch(response => {
                response.text()
                    .then(body => {
                        _this.setState({
                            serverResponseBody: body
                        })
                    })
            });
    }

    handleChange(event) {

        let registrationForm = document.getElementById("login-form");

        this.setState({
            loginForm: {
                username: registrationForm.elements["username"].value,
                password: registrationForm.elements["password"].value
            }
        });
    }

    render() {

        return (

            <div>

                <form name="login-form" id="login-form" className="auth-form" onSubmit={this.handleSubmit} >
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <input type="submit" value="Login"/>
                </form>

                <div className="server-response-message"> {this.state.serverResponseBody} </div>

            </div>

        );

    }
}

export default LoginViewerComponent