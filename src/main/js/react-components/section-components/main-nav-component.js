import React from "react";

const MainNavComponent = (props) => { 
    
    // TODO: set this from the store
    let isUserLoggedIn = false;

    return (

        <div class="main-nav-wrap">
            <nav class="main-nav">
                (isUserLoggedIn) 
                    ? <div> Login </div>
                    : <div> Logout </div>
            </nav>
        </div>
    );
}

export default MainNavComponent