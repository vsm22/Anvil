import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import ApplicationStateTypes from "./application-state-types";

class ApplicationStateStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return ApplicationStateTypes.DISPLAY_LANDING;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.REDIRECT_LOCATION:
        return ApplicationStateTypes.REDIRECT_LOCATION;

      case ActionTypes.INIT_ARTIST_SEARCH:
      case ActionTypes.INIT_ARTIST_PAGE_LOAD:
        return ApplicationStateTypes.DISPLAY_SPINNER;

      case ActionTypes.FINISH_ARTIST_SEARCH:
        return ApplicationStateTypes.DISPLAY_ARTIST_SEARCH_RESULTS;

      case ActionTypes.FINISH_ARTIST_PAGE_LOAD:
        return ApplicationStateTypes.DISPLAY_ARTIST_INFO;

      default:
        return state;
    }
  }
}

export default new ApplicationStateStore()
