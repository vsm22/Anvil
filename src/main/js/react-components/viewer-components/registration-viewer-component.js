import React from "react";
import { REGISTRATION_API_URL } from "config"

class RegistrationViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("Attempting handle submit");
        console.log("REGISTRATION_API_URL: " + REGISTRATION_API_URL);

        let query = REGISTRATION_API_URL
                    + "?username=" + this.state.username
                    + "&email=" + this.state.email
                    + "&password=" + this.state.password;

        fetch(query, { method: "POST" })
            .then((response) => {
                return response.text();
            })
            .then((token) => {
                localStorage.setItem("jwt": token);
            });

        console.log(localStorage.getItem("jwt"));
    }

    handleChange(event) {

        let registrationForm = document.getElementById("registration-form");

        this.setState({
            username: registrationForm.elements["username"].value,
            email: registrationForm.elements["email"].value,
            password: registrationForm.elements["password"].value,
            confirmPassword: registrationForm.elements["confirm-password"].value
        });
    }

    render() {

        return (

            <form name="registration-form" id="registration-form" onSubmit={this.handleSubmit} >

                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <input type="password" name="confirm-password" placeholder="Confirm Password" onChange={this.handleChange} />
                <input type="submit" value="Register" />

            </form>

        );

    }
}

export default RegistrationViewerComponent