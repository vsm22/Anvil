import ActionTypes from "./ActionTypes";
import MainDispatcher from "./MainDispatcher";
import ArtistSearchService from "../services/ArtistSearchService";

const DispatcherActions = {
  initArtistSearch(query) {
      MainDispatcher.dispatch({
        type: ActionTypes.INIT_ARTIST_SEARCH,
        searchQuery: query
      });
  },

  finishArtistSearch(query) {
    ArtistSearchService.getXHRPromise(query)
      .then(jsonResult => {
        MainDispatcher.dispatch({
          type: ActionTypes.FINISH_ARTIST_SEARCH,
          artistSearchResultJSON: jsonResult
        });
      });
  },

  initArtistPageLoad(artistName) {
    MainDispatcher.dispatch({
      type: ActionTypes.INIT_ARTIST_PAGE_LOAD,
      artistName: artistName
    })
  },

  finishArtistPageLoad(artistInfoJSON) {
    MainDispatcher.dispatch({
      type: ActionTypes.FINISH_ARTIST_PAGE_LOAD,
      artistInfoJSON: artistInfoJSON
    })
  },

  setSearchQuery(newQuery) {
    MainDispatcher.dispatch({
      type: ActionTypes.SET_SEARCH_QUERY,
      searchQuery: newQuery
    });
  }
}

export default DispatcherActions
