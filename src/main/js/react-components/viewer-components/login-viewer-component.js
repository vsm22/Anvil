import React from "react";
import AuthenticationService from "services/authentication-service";
import { LOGIN_API_URL } from "config";

class LoginViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        AuthenticationService.login(this.state.username, this.state.password);
    }

    handleChange(event) {

        let registrationForm = document.getElementById("login-form");

        this.setState({
            username: registrationForm.elements["username"].value,
            password: registrationForm.elements["password"].value
        });
    }

    render() {

        return (

            <form name="login-form" id="login-form" className="auth-form" onSubmit={this.handleSubmit} >
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <input type="submit" value="Login"/>
            </form>

        );

    }
}

export default LoginViewerComponent