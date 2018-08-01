import {REGISTRATION_API_URL,
        LOGIN_API_URL,
        CURRENT_USER_API_URL,
        RENEW_TOKEN_URL,
        GET_GUEST_TOKEN_URL } from "config";

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

    saveAuthorization: function saveAuthorization(user) {

        if (user.username !== null && user.jwt !== null) {

            if (user.username === "guest") {

                sessionStorage.setItem("username", "guest");
                sessionStorage.setItem("jwt", user.jwt);

            } else {

                localStorage.setItem("username", user.username);
                localStorage.setItem("jwt", user.jwt);
            }
        }
    },

    logout: function logout() {

        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
    },

    clearGuestSession: function clearGuestSession() {

        sessionStorage.removeItem("username");
        sessionStorage.removeItem("jwt");
    },

    /**
     * Retrieve the user info associated with current JWT token and get a new token.
     */
    renewToken: function renewToken(token) {

        return new Promise((resolve, reject) => {

                fetch(RENEW_TOKEN_URL, {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
                .then(response => {

                    if (response.status !== 200) {

                        return reject(response);

                    } else {

                        return response.json();
                    }
                })
                .then(json => {

                    return resolve(json);
                })
                .catch(response => {

                    reject(response);
                });
        });
    },

    /**
     * Get a temporary (per-session) guest token.
     */
    getGuestToken: function getGuestToken() {

        return new Promise((resolve, reject) => {

            fetch(GET_GUEST_TOKEN_URL)
                .then(response => {

                    if (response.status !== 200) {

                        return reject(repsonse);

                    } else {

                        return response.json();
                    }
                })
                .then(json => {

                    sessionStorage.setItem("username", "guest");
                    sessionStorage.setItem("jwt", json.token);

                    return resolve({
                        username: "guest",
                        jwt: jason.token
                    });
                })
                .catch(response => {

                    return reject(response);
                })

        });
    },

    /**
     * Retrieve the current user from local storage (or sessionstorage for guest user)
     * and attempt to renew authentication on the server.
     */
    getCurrentUser: function getCurrentUser() {

        return new Promise((resolve, reject) => {

            if (localStorage.getItem("jwt") !== null) {

                return resolve({
                    username: localStorage.getItem("username"),
                    jwt: localStorage.getItem("jwt")
                });

            } else if (sessionStorage.getItem("jwt") !== null) {

                return resolve({
                    username: sessionStorage.getItem("username"),
                    jwt: sessionStorage.getItem("jwt")
                });

            } else {

                AuthenticationService.getGuestToken()
                    .then(user => {

                        return resolve({
                            username: user.username,
                            jwt: user.jwt
                        })
                    })
                    .catch(response => {

                       return reject({
                           username: null,
                           jwt: null
                       });
                    });
            }
        });
    }
}

export default AuthenticationService