import ApiAccessorService from "./api-accessor-service"

export default {
  getXHRPromise: (artistName) => {
    let requestUrl = "/api/getArtistInfo?query=" + artistName;
    return ApiAccessorService.getXHRPromise(requestUrl);
  }
}
