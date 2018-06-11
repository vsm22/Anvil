import { ReduceStore } from "flux/utils";
import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import DispatcherActions from "../flux-dispatcher/dispatcher-actions";
import ArtistSearchService from "../../services/artist-search-service";

class ArtistSearchStore extends ReduceStore {
    constructor() {
        super(MainDispatcher);
    }

    /**
     *  State contains currentQuery and cache properties
    **/
    getInitialState() {
        return {
            currentQuery: {
                artistName: "",
                artistList: [{
                    name: "",
                    imageSmallUrl: "",
                    imageMediumUrl: "",
                    imageLargeUrl: ""
                }]
            },
            cache: new Map()
        };
    }

    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.INIT_ARTIST_SEARCH:
                if (state.cache.has(action.query)) {
                    return {
                        currentQuery: {
                            artistName: action.query,
                            artistList: state.cache.get(action.query),
                        },
                        cache: state.cache.set(action.query, {
                            lastAccessed: Date.now(),
                            artistList: state.cache.get(action.query).artistList
                        })
                    };
                }
                else {
                    ArtistSearchService.getXHRPromise(action.query)
                        .then(result => {
                            DispatcherActions.finishArtistSearch(result)
                        }
                        );
                    return {
                        currentQuery: {
                            artistName: action.query,
                            artistList: []
                        },
                        cache: state.cache
                    };
                }

            case ActionTypes.FINISH_ARTIST_SEARCH:
                return {
                    currentQuery: {
                        artistName: state.currentQuery.artistName,
                        artistList: action.result["artistList"]
                    },
                    cache: state.cache.set(state.currentQuery.artistName,
                        {
                            lastAccessed: Date.now(),
                            artistList: action.result["artistList"]
                        }
                    )
                };

            default:
                return state;
        }
    }
}

export default new ArtistSearchStore()
