import React from "react";
import AuthenticationService from "services/authentication-service";

class RegistrationViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registrationForm: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
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

        let form = this.state.registrationForm;

        AuthenticationService.register(form.username, form.email, form.password)
            .then(response => {

                if (response.status === 200) {
                    _this.props.history.push("/");
                } else {
                    response.text()
                        .then(body => {
                            _this.setState({
                                serverResponseBody: body
                            });
                        });
                }
            });
    }

    handleChange(event) {

        let registrationForm = document.getElementById("registration-form");

        this.setState({
            registrationForm: {
                username: registrationForm.elements["username"].value,
                email: registrationForm.elements["email"].value,
                password: registrationForm.elements["password"].value,
                confirmPassword: registrationForm.elements["confirm-password"].value
            }
        });
    }

    render() {

        return (

            <div>

                <form name="registration-form" id="registration-form" className="auth-form" onSubmit={this.handleSubmit} >
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <input type="password" name="confirm-password" placeholder="Confirm Password" onChange={this.handleChange} />
                    <input type="submit" value="Register" />
                </form>

                <div className="server-response-message"> {this.state.serverResponseBody} </div>

            </div>

        );

    }
}

export default RegistrationViewerComponent