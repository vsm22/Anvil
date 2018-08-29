import React from "react";
import { Link } from "react-router-dom";

class AuthenticationNav extends React.Component {

    render() {

        let username = this.props.authentication.username;

        let isUserLoggedIn = (username === null) ? false : true;

        return (

            <nav class="authentication-nav">

                <i className="fas fa-user"></i>

                <ul>

                    <li>
                        {
                            (username === null || username === "guest" || username === undefined)
                                ? <Link to="/login">
                                    <button>
                                        Log in
                                    </button>
                                </Link>

                                : <Link to="/logout">
                                    <button>
                                        Log out
                                    </button>
                                </Link>
                        }
                    </li>

                    <li>
                        {
                            (username === null || username === "guest" || username === undefined)
                                ? <Link to="/register">
                                    <button>
                                        Register
                                    </button>
                                </Link>
                                : ""
                        }
                    </li>

                </ul>

                <label className="current-user-label">
                    {
                        (username !== null && username !== undefined && username !== "" && username !== "guest")
                            ?   <span>
                                    { " Logged in as " + username }
                                </span>
                            : ""
                    }
                </label>

            </nav>

        );
    }
}

export default AuthenticationNav