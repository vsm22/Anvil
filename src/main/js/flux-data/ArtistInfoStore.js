import {ReduceStore} from "flux/utils";
import MainDispatcher from "../flux-dispatcher/MainDispatcher";
import ActionTypes from "../flux-dispatcher/ActionTypes";
import DispatcherActions from "../flux-dispatcher/DispatcherActions";
import ArtistInfoService from "../services/ArtistInfoService";

class ArtistSearchStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.INIT_ARTIST_PAGE_LOAD:
        ArtistInfoService.getXHRPromise(action.artistName)
          .then(result => {
            DispatcherActions.finishArtistPageLoad(result);
          });
        return state;

      case ActionTypes.FINISH_ARTIST_PAGE_LOAD:
        return [action.artistInfoJSON];

      default:
        return state;
    }
  }
}

export default new ArtistSearchStore()
