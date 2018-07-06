import {REGISTRATION_API_URL,
        LOGIN_API_URL,
        CURRENT_USER_API_URL} from "config";

export default {

    /**
     * Login.
     */
    login: function login(username, password) {

        try {

            let query = LOGIN_API_URL
                        + "?username=" + username
                        + "&password=" + password;

            fetch(query, { method: "POST" })
                .then((response) => {

                    if (response.status === 200) {
                        return response.text();
                    } else {
                        throw "Login not successful.";
                    }
                })
                .then((token) => {
                    localStorage.setItem("jwt", token);
                    console.log("Current JWT in LocalStorage: " + localStorage.getItem("jwt"));
                });

            return true;

        } catch(err) {

            return false;
        }
    },

    /**
     * Register a new user.
     */
    register: function register(username, email, password) {

        try {

            let query = REGISTRATION_API_URL
                        + "?username=" + username
                        + "&email=" + email
                        + "&password=" + password;

            fetch(query, { method: "POST" })
                .then((response) => {

                    if(response.status === 200) {
                        return response.text();
                    } else {
                        throw "Registration not successful";
                    }
                })
                .then((token) => {
                    localStorage.setItem("jwt", token);
                    console.log("Current JWT in LocalStorage: " + localStorage.getItem("jwt"));
                });

            return true;

        } catch(err) {

            return false;
        }
    },

    /**
     * Retrieve the user info associated with current JWT token.
     */
    retrieveCurrentUser: function retrieveCurrentUser() {

        let jwtToken = localStorage.getItem("jwt");

        fetch(CURRENT_USER_API_URL, {
                method: "GET",
                headers: {
                    "Authorization" : "Bearer " + jwtToken
                }
            })
            .then((response) => {

                if (response.status !== 200) {
                    throw "Server error during token authentication."
                }

                return response.json();
            })
            .then((json) => {

                console.log(json.username);

            });
    }

}