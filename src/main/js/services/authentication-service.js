import ApiUrls from "config/api-urls";

const AuthenticationService = {

    /**
     * Login.
     */
    login: function login(username, password) {

        return new Promise((resolve, reject) => {

            let query = ApiUrls.LOGIN_API_URL
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

            let query = ApiUrls.REGISTRATION_API_URL
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

                localStorage.removeItem("username");
                localStorage.removeItem("jwt");

                sessionStorage.setItem("username", "guest");
                sessionStorage.setItem("jwt", user.jwt);

            } else {

                sessionStorage.removeItem("username");
                sessionStorage.removeItem("jwt");

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
     * Renew the authentication token.
     */
    renewToken: function renewToken(token) {

        return new Promise((resolve, reject) => {

                fetch(ApiUrls.RENEW_TOKEN_URL, {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
                .then(response => {

                    if (response.status !== 200) {

                        return reject(response);

                    } else {

                        return response.json()
                                   .then(json => {
                                       return resolve({
                                            username: json.username,
                                            jwt: json.token
                                       });
                                   });
                    }
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

            fetch(ApiUrls.GET_GUEST_TOKEN_URL)
                .then(response => {

                    if (response.status !== 200) {

                        return reject(repsonse);

                    } else {

                        return response.json();
                    }
                })
                .then(json => {

                    return resolve({
                        username: "guest",
                        jwt: json.token
                    });
                })
                .catch(response => {

                    return reject(response);
                });
        });
    },

    /**
     * Retrieve the current user from local storage (or sessionstorage for guest user).
     * Do not attempt to renew the token (as opposed to the method getCurrentUserAndRenew).
     * This method is to be called to retrieve credentials before each API request.
     * If successful, the API call should return renewed credentials in the response header.
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

                            AuthenticationService.saveAuthorization(user);

                            return resolve(user);
                        })
                        .catch(response => {

                           return reject({
                               username: null,
                               jwt: null
                           });
                        });
                }
            });
    },

    /**
     * Retrieve the current user from local storage (or session storage for guest user)
     * and attempt to renew authentication token. This method is to be called when the
     * root component first mounts. At that point the browser may still have credentials
     * stored, so we need to renew them to make sure they are valid.
     */
    getCurrentUserAndRenew: function getCurrentUserAndRenew() {

        return new Promise((resolve, reject) => {

                if (localStorage.getItem("jwt") !== null) {

                    AuthenticationService.renewToken(localStorage.getItem("jwt"))
                        .then(user => {

                            AuthenticationService.saveAuthorization(user);
                            return resolve(user);

                        })
                        .catch(response => {

                            AuthenticationService.logout();
                            return AuthenticationService.getCurrentUserAndRenew();
                        });

                } else if (sessionStorage.getItem("jwt") !== null) {

                    AuthenticationService.renewToken(sessionStorage.getItem("jwt"))
                        .then(user => {

                            AuthenticationService.saveAuthorization(user);
                            return resolve(user);

                        })
                        .catch(response => {

                            AuthenticationService.clearGuestSession();
                            return AuthenticationService.getCurrentUserAndRenew();
                        });

                } else {

                    AuthenticationService.getGuestToken()
                        .then(user => {

                            AuthenticationService.saveAuthorization(user);
                            return resolve(user);
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