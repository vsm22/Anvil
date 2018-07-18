import { ARTIST_SEARCH_URL,
         ALBUM_SEARCH_URL,
         TRACK_SEARCH_URL,
         ARTIST_INFO_URL,
         ALBUM_INFO_URL,
         TRACK_INFO_URL,
         SIMILAR_ARTISTS_URL,
         ARTIST_ALBUMS_URL } from "config";

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
    getSimilarArtists: function getArtistAlbums(artistName) {

        let query = ARTIST_ALBUMS_URL
                    + "?query=" + artistName;

        return fetch(query)
            .then(response => {

                if (response.status !== 200) {
                    throw "Similar artists request did not complete successfully";
                }

                return response.json();
            });
    }
}