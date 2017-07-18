import {ReduceStore} from "react/utils";
import MainDispatcher from "../flux-dispatcher/MainDispatcher";
import ActionTypes from "../flux-dispatcher/ActionTypes";

class ApplicationStateStore extends ReduceStore {
  constructor() {
    super(MainDispatcher);
  }

  getInitialState() {
    return ({
      renderSpinner: false,
      renderSearchResultViewer: false
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_ARTIST_SEARCH:
        return {
          renderSpinner: true
        }
    }
  }
}
