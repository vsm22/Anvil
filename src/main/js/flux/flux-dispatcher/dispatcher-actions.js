import ActionTypes from "./action-types";
import MainDispatcher from "./main-dispatcher";
import ArtistSearchService from "../../services/artist-search-service";

const DispatcherActions = {
  redirectLocation(url) {
    MainDispatcher.dispatch({
      type: ActionTypes.REDIRECT_LOCATION,
      url: url
    });
  },

  initArtistSearch(query) {
      MainDispatcher.dispatch({
        type: ActionTypes.INIT_ARTIST_SEARCH,
        query: query
      });
  },

  finishArtistSearch(result) {
      MainDispatcher.dispatch({
        type: ActionTypes.FINISH_ARTIST_SEARCH,
        result: result
      });
  },

  initArtistPageLoad(query) {
    MainDispatcher.dispatch({
      type: ActionTypes.INIT_ARTIST_PAGE_LOAD,
      query: query
    })
  },

  finishArtistPageLoad(result) {
    MainDispatcher.dispatch({
      type: ActionTypes.FINISH_ARTIST_PAGE_LOAD,
      result: result
    })
  },

  loadSimilarArtists(similarArtistsJSON) {
    MainDispatcher.dispatch({
      type: ActionTypes.LOAD_SIMILAR_ARTISTS,
      similarArtistsJSON: similarArtistsJSON
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
