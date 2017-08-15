import ApiAccessorService from "./api-accessor-service"

export default {
  getXHRPromise: (artistName) => {
    let requestUrl = "/api/getArtistSearch?query=" + artistName;
    return ApiAccessorService.getXHRPromise(requestUrl);
  }
}
