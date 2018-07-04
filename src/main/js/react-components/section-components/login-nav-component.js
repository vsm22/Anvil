import React from "react";
import { Link } from "react-router-dom";

const AuthenticationNavComponent = (props) => {

    // TODO: set this from the store
    let isUserLoggedIn = false;

    return (

        <nav class="authentication-nav">
            <ul>

                <li>
                    <Link to="/login">
                        <button>
                            {(isUserLoggedIn === false) ? <div> Log in </div> : <div> Log out </div>}
                        </button>
                    </Link>
                </li>

                <li>
                    <Link to="/register">
                        <button>
                            {(isUserLoggedIn === false) ? <div> Register </div> : ""}
                        </button>
                    </Link>
                </li>

            </ul>
        </nav>

    );

};

export default AuthenticationNavComponent