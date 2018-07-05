import React from "react";
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

        console.log("Attempting handle submit");

        let query = LOGIN_API_URL
                    + "?username=" + this.state.username
                    + "&password=" + this.state.password;

        fetch(query, { method: "POST" })
            .then((response) => {
                return response.text();
            })
            .then((token) => {
                localStorage.setItem("jwt", token);
            });

        console.log(localStorage.getItem("jwt"));
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

            <form name="login-form" id="login-form" onSubmit={this.handleSubmit} >

                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <input type="submit" />

            </form>

        );

    }
}

export default LoginViewerComponent