import React from "react";
import { Link } from "react-router-dom";

class AuthenticationNavComponent extends React.Component {

    render() {

        let username = localStorage.getItem("username");

        let isUserLoggedIn = (username === null) ? false : true;

        return (

            <nav class="authentication-nav">
                <ul>

                    <li>
                        {
                            (isUserLoggedIn === false)
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
                            (isUserLoggedIn === false)
                                ? <Link to="/register">
                                    <button>
                                        Register
                                    </button>
                                </Link>
                                : ""
                        }
                    </li>

                </ul>

                <div className="current-user">
                    {(isUserLoggedIn === true) ? "Logged in as " + username : ""}
                </div>
            </nav>

        );
    }
}

export default AuthenticationNavComponent