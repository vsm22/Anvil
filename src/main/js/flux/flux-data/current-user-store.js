import { ReduceStore } from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";

class ApplicationStateStore extends ReduceStore {
    constructor() {
        super(MainDispatcher);
    }

    getInitialState() {
        return {
            username: null,
            jwt: null
        }
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.GET_CURRENT_USER
                return {
                    username: sessionStorage.getItem("username"),
                    jwt: sessionStorage.getItem("jwt")
                }

            default:
                return state;
        }
    }
}

export default new ApplicationStateStore()