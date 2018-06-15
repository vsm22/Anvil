import React from "react";

const LoginNavComponent = (props) => {

    // TODO: set this from the store
    let isUserLoggedIn = false;

    return (

        <nav class="login-nav">
            <ul>

                <li>
                    <button>
                        {(isUserLoggedIn === false) ? <div> Log in </div> : <div> Log out </div>}
                    </button>
                </li>

                <li>
                    <button>
                        {(isUserLoggedIn === false) ? <div> Register </div> : ""}
                    </button>
                </li>

            </ul>
        </nav>

    );
}

export default LoginNavComponent