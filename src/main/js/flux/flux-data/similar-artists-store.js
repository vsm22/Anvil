import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import DispatcherActions from "../flux-dispatcher/dispatcher-actions";
import SimilarArtistsService from "../../services/similar-artists-service";

class SimilarArtistsStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.INIT_ARTIST_PAGE_LOAD:
        SimilarArtistsService.getXHRPromise(action.artistName)
          .then(result => {
            DispatcherActions.loadSimilarArtists(result);
          });
        return state;

      case ActionTypes.LOAD_SIMILAR_ARTISTS:
        return action.similarArtistsJSON["artistList"];

      default:
        return state;
    }
  }
}

export default new SimilarArtistsStore()
