import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";

class SearchQueryStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return "";
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SET_SEARCH_QUERY:
        return action.searchQuery;

      default:
        return state;
    }
  }
}

export default new SearchQueryStore()
