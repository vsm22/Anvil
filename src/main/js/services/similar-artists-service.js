import ApiAccessorService from "./api-accessor-service"

export default {
    getXHRPromise: (artistName) => {
        let requestUrl = "/api/getSimilarArtists?query=" + artistName;
        return ApiAccessorService.getXHRPromise(requestUrl);
    }
}
