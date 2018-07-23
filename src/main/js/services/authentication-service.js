import {REGISTRATION_API_URL,
        LOGIN_API_URL,
        CURRENT_USER_API_URL} from "config";

export default {

    /**
     * Login.
     */
    login: function login(username, password) {

        return new Promise((resolve, reject) => {

            let query = LOGIN_API_URL
                        + "?username=" + username
                        + "&password=" + password;

            fetch(query, { method: "POST" })
                .then((response) => {

                    resolve(response);

                    if (response.status === 200) {
                        return response.text();
                    }
                })
                .then((token) => {
                    localStorage.setItem("jwt", token);
                });
        });
    },

    /**
     * Register a new user.
     */
    register: function register(username, email, password) {

        return new Promise((resolve, reject) => {

            let query = REGISTRATION_API_URL
                        + "?username=" + username
                        + "&email=" + email
                        + "&password=" + password;

            fetch(query, { method: "POST" })
                .then((response) => {

                    resolve(response);

                    if (response.status === 200) {
                        return response.text();
                    }
                })
                .then((token) => {
                    console.log("Setting jwt token: " + token);
                    localStorage.setItem("jwt", token);
                });
        });

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