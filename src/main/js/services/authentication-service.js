import {REGISTRATION_API_URL,
        LOGIN_API_URL,
        CURRENT_USER_API_URL,
        RENEW_TOKEN_URL} from "config";

const AuthenticationService = {

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

                    if (response.status === 200) {
                        return response.json();
                    } else {
                        reject(response);
                    }
                })
                .then((json) => {
                    localStorage.setItem("username", json.username)
                    localStorage.setItem("jwt", json.token);

                    resolve();
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

                    if (response.status === 200) {
                        return response.json();
                    } else {
                        reject(response);
                    }
                })
                .then((json) => {
                    localStorage.setItem("username", json.username);
                    localStorage.setItem("jwt", json.token);

                    resolve();
                });
        });

    },

    logout: function logout() {

        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
    },

    /**
     * Retrieve the user info associated with current JWT token and get a new token.
     */
    renewToken: function renewToken() {

        return new Promise((resolve, reject) => {

                let jwtToken = localStorage.getItem("jwt");

                if (jwtToken === null) {
                    return reject();
                }

                fetch(RENEW_TOKEN_URL, {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + jwtToken
                    }
                })
                .then((response) => {

                    if (response.status !== 200) {

                        return reject();

                    } else {

                        return response.json();
                    }
                })
                .then((json) => {

                    localStorage.setItem("username", json.username);
                    localStorage.setItem("jwt", json.token);

                    return resolve(json);
                });
        });
    },

    /**
     * Retrieve the current user from localstorage.
     */
    getCurrentUser: function getCurrentUser() {

        return {
            username: localStorage.getItem("username"),
            jwt: localStorage.getItem("jwt")
        }
    }
}

export default AuthenticationService