import ApiUrls from "config/api-urls";
import AuthenticationService from "services/authentication-service";

const ApiClientService = {

    /**
     * Return a promise with the json for the corresponding search.
     */
    getArtistSearch: function getArtistSearch(artistName) {

        let query = ApiUrls.ARTIST_SEARCH_URL
                    + "?query=" + artistName;

        return fetch(query)
            .then(response => {

                if (response.status !== 200) {
                    throw "Artist search did not complete successfully";
                }

                return response.json();
            });
    },

    /**
     * Return a promise with the json for the corresponding artist info.
     */
    getArtistInfo: function getArtistSearch(artistName) {

        let query = ApiUrls.ARTIST_INFO_URL
                    + "?query=" + artistName;

        return fetch(query)
            .then(response => {

                if (response.status !== 200) {
                    throw "Artist info request did not complete successfully";
                }

                return response.json();
            });
    },

    /**
     * Return a promise with the json for the corresponding similar artists search
     */
    getSimilarArtists: function getSimilarArtists(artistName) {

        let query = ApiUrls.SIMILAR_ARTISTS_URL
                    + "?query=" + artistName;

        return fetch(query)
            .then(response => {

                if (response.status !== 200) {
                    throw "Similar artists request did not complete successfully";
                }

                return response.json();
            });
    },

    /**
     * Return a promise with the json for the corresponding artist albums search.
     */
    getArtistAlbums: function getArtistAlbums(artistName) {

        let query = ApiUrls.ARTIST_ALBUMS_URL
                    + "?query=" + artistName;

        return fetch(query)
            .then(response => {

                if (response.status !== 200) {
                    throw "Similar artists request did not complete successfully";
                }

                return response.json();
            });
    },

    /* =====================================================================
     * AUTHENTICATED API METHODS
     * ===================================================================== /

    /**
     * Create a new artist collection.
     */
    createArtistCollection: function createArtistCollection(collectionName) {

        return AuthenticationService.getCurrentUser()
            .then(user => {

                return new Promise((resolve, reject) => {

                    let query = ApiUrls.CREATE_ARTIST_COLLECTION_URL
                                + "?query=" + collectionName;

                    fetch(query, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + user.jwt
                        }
                    }).then(response => {

                        if (response.status !== 200) {

                            if (response.status === 401) {

                                AuthenticationService.getGuestToken()
                                    .then(user => {
                                        return ApiClientService.createArtistCollection(collectionName);
                                    });

                            } else {

                                return reject(response);
                            }
                        } else {

                            let authorization = JSON.parse(response.headers.get('Authorization'));
                            AuthenticationService.saveAuthorization({
                                username: authorization.username,
                                jwt: authorization.token
                            });

                            return resolve(response);
                        }
                    });
                });
            });
    },

    /**
     * Get a list of artist collections for the current user.
     */
    getArtistCollections: function getArtistCollections() {

        return AuthenticationService.getCurrentUser()
            .then(user => {

                return new Promise((resolve, reject) => {

                    fetch(ApiUrls.GET_ARTIST_COLLECTIONS_URL, {
                        method: "GET",
                        headers: {
                           "Authorization": "Bearer " + user.jwt
                        }
                    }).then(response => {

                        if (response.status !== 200) {

                            if (response.status === 401) {

                                AuthenticationService.getGuestToken()
                                    .then(user => {
                                        return ApiClientService.getArtistCollections();
                                    });

                            } else {

                                return reject(response);
                            }
                        } else {

                            let authorization = JSON.parse(response.headers.get('Authorization'));
                            AuthenticationService.saveAuthorization({
                                username: authorization.username,
                                jwt: authorization.token
                            });

                            return resolve(response);
                        }
                    }).catch(() => {
                        return reject();
                    });
                });
            });
    },

    /**
     * Add artist to a collection.
     */
    addArtistToCollection: function addArtistToCollection(artist, collection) {

        return AuthenticationService.getCurrentUser()
            .then(user => {

                return new Promise((resolve, reject) => {

                    let query = ApiUrls.ADD_ARTIST_TO_COLLECTION_URL
                                + "?collectionName=" + collection.collectionName;

                    fetch(query, {
                        method: "POST",
                        headers: {
                            "Authorization" : "Bearer " + user.jwt
                        },
                        body: JSON.stringify(artist)
                    }).then(response => {

                        if (response.status !== 200) {

                            if (response.status === 401) {

                                AuthenticationService.getGuestToken()
                                    .then(user => {
                                        return ApiClientService.addArtistToCollection(artist, collection);
                                    });

                            } else {

                                return reject(response);
                            }
                        } else {

                            let authorization = JSON.parse(response.headers.get('Authorization'));
                            AuthenticationService.saveAuthorization({
                                username: authorization.username,
                                jwt: authorization.token
                            });

                            return resolve(response);
                        }
                     }).catch(() => {
                         return reject();
                     });
                });
            });
    }
}

export default ApiClientService