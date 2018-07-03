import React from "react";

class LoginViewerComponent extends React.Component {


    render() {

        return (

            <form name="login-form" id="login-form" onsubmit="return false">

                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" />

            </form>

        );

    }
}

export default LoginViewerComponent