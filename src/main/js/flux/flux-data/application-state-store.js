import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import ApplicationStateTypes from "./application-state-types";

class ApplicationStateStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return ApplicationStateTypes.READY;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_ARTIST_SEARCH:
      case ActionTypes.INIT_ARTIST_PAGE_LOAD:
        console.log("LOADING");
        return ApplicationStateTypes.READY;

      case ActionTypes.FINISH_ARTIST_SEARCH:
        return ApplicationStateTypes.SEARCH_RESULT;

      default:
        console.log("READY");
        return ApplicationStateTypes.READY;
    }
  }
}

export default new ApplicationStateStore()
