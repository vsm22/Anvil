import React from "react";
import AuthenticationService from "services/authentication-service";

class LogoutViewerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        AuthenticationService.logout();
        this.props.getCurrentUser();
        this.props.history.push("/");
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default LogoutViewerComponent