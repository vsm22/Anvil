import {ReduceStore} from "flux/utils";
import MainDispatcher from "../flux-dispatcher/MainDispatcher";
import ActionTypes from "../flux-dispatcher/ActionTypes";
import DispatcherActions from "../flux-dispatcher/DispatcherActions";
import ArtistSearchService from "../services/ArtistSearchService";

class ArtistSearchStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.INIT_ARTIST_SEARCH:
        DispatcherActions.finishArtistSearch(action.searchQuery);
        return state;

      case ActionTypes.FINISH_ARTIST_SEARCH:
        return action.artistSearchResultJSON["artistList"];

    default:
        return state;
    }
  }
}

export default new ArtistSearchStore()
