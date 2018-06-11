import { ReduceStore } from "flux/utils";
import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import { createBrowserHistory } from "history";
import ActionTypes from "../flux-dispatcher/action-types";

class LocationStore extends ReduceStore {
    constructor() {
        super(MainDispatcher);
    }

    getInitialState() {
        return "";
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.REDIRECT_LOCATION:
                createBrowserHistory({ forceRefresh: true })
                    .push(action.url);
                return action.url;
            default:
                return state;
        }
    }
}

export default new LocationStore()
