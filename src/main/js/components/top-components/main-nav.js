import React from "react";
import { Link } from "react-router-dom";

const MainNav = (props) => {

    return (

        <nav class="main-nav">
            <ul>

                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/collections">
                        Collections
                    </Link>
                </li>

                <li>
                    <Link to="/favorites">
                        Favorites
                    </Link>
                </li>

                <li>
                    <Link to="/recommendations">
                        Recommendations
                    </Link>
                </li>

                <li>
                    <Link to="/friends">
                        Friends
                    </Link>
                </li>

            </ul>
        </nav>

    );
}

export default MainNav