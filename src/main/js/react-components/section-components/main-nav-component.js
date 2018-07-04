import React from "react";

const MainNavComponent = (props) => {

    // TODO: set this from the store
    let isUserLoggedIn = false;

    return (

        <nav class="main-nav">
            <ul>

                <li>
                    <a href="">
                        Top Artists
                    </a>
                </li>

                <li>
                    <a href="">
                        My Collections
                    </a>
                </li>

                <li>
                    <a href="">
                        My Playlists
                    </a>
                </li>

            </ul>
        </nav>

    );
}

export default MainNavComponent