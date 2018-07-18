import { CREATE_USER_ARTIST_COLLECTION_API_URL } from "config";

export default {

    /**
     * Get all collections associated with current user.
     */
    getUserCollections() {

    },


    /**
     * Create a new user artist collection.
     */
    createUserArtistCollection(collectionName) {

        try {

            let query = CREATE_USER_ARTIST_COLLECTION_API_URL
                        + "?collectionName=" + collectionName;

            let jwtToken = localStorage.getItem("jwt");

            fetch(query, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + jwtToken
                    }
                })
                .then((response) => {

                    if (response.status !== 200) {
                        throw "Server error encountered attempting to create new user artist collection."
                    }

                    return true;
                });

        } catch (err) {

            console.log(err);
            return false;
        }

    }
}