import ActionTypes from "./action-types";
import MainDispatcher from "./main-dispatcher";
import ArtistSearchService from "../../services/artist-search-service";

const DispatcherActions = {

    getCurrentUser() {
        MainDispatcher.dispatch({
            type: ActionTypes.GET_CURRENT_USER
        });
    },

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

    finishSimilarArtistsLoad(result) {
        MainDispatcher.dispatch({
            type: ActionTypes.FINISH_SIMILAR_ARTISTS_LOAD,
            result: result
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
