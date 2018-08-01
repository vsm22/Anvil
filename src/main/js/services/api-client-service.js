import { ARTIST_SEARCH_URL,
         ALBUM_SEARCH_URL,
         TRACK_SEARCH_URL,
         ARTIST_INFO_URL,
         ALBUM_INFO_URL,
         TRACK_INFO_URL,
         SIMILAR_ARTISTS_URL,
         ARTIST_ALBUMS_URL,
         CREATE_ARTIST_COLLECTION_URL,
         GET_ARTIST_COLLECTIONS_URL } from "config";
import AuthenticationService from "services/authentication-service";

export default {

    /**
     * Return a promise with the json for the corresponding search.
     */
    getArtistSearch: function getArtistSearch(artistName) {

        let query = ARTIST_SEARCH_URL
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

        let query = ARTIST_INFO_URL
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

        let query = SIMILAR_ARTISTS_URL
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

        let query = ARTIST_ALBUMS_URL
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
     * Create a new artist collection.
     */
    createArtistCollection: function createArtistCollection(collectionName) {

        return AuthenticationService.getCurrentUser()
            .then(user => {

                return new Promise((resolve, reject) => {

                    let query = CREATE_ARTIST_COLLECTION_URL
                                + "?query=" + collectionName;

                    fetch(query, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + user.jwt
                        }
                    }).then(response => {

                        let authorization = JSON.parse(response.headers.get('Authorization'));
                        AuthenticationService.saveAuthorization({
                            username: authorization.username,
                            jwt: authorization.token
                        });

                        if (response.status !== 200) {
                            return reject(response);
                        } else {
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

                    fetch(GET_ARTIST_COLLECTIONS_URL, {
                        method: "GET",
                        headers: {
                           "Authorization": "Bearer " + user.jwt
                        }
                    }).then(response => {

                        if (response.status === 200) {
                            return resolve(response);
                        } else {
                            return reject(response);
                        }
                    }).catch(() => {
                        return reject();
                    });
                });
            });
    }
}