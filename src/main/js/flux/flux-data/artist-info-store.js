import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import DispatcherActions from "../flux-dispatcher/dispatcher-actions";
import ArtistInfoService from "../../services/artist-info-service";

class ArtistInfoStore extends ReduceStore {
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
        artistInfo: {
          "name": "",
          "imageSmallUrl": "",
          "imageMediumUrl": "",
          "imageLargeUrl": "",
          "bio": "",
          "similarArtists": [{}]
        }
      },
      cache: new Map()
    };
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.INIT_ARTIST_PAGE_LOAD:
        if (state.cache.has(action.query)) {
          return {
            currentQuery: {
              artistName: action.query,
              artistInfo: state.cache.get(action.query),
            },
            cache: state.cache.set(action.query, {
              lastAccessed: Date.now(),
              artistInfo: state.cache.get(action.query).artistInfo
            })
          };
        }
        else {
          ArtistInfoService.getXHRPromise(action.query)
            .then(result => {
              DispatcherActions.finishArtistPageLoad(result);
            }
          );
          return {
            currentQuery: {
              artistName: action.query,
              artistInfo: {}
            },
            cache: state.cache
          };
        }

      case ActionTypes.FINISH_ARTIST_PAGE_LOAD:
        return {
          currentQuery: {
            artistName: state.currentQuery.artistName,
            artistInfo: action.result
          },
          cache: state.cache.set(state.currentQuery.artistName,
            {
              lastAccessed: Date.now(),
              artistInfo: action.result
            }
          )
        };

      default:
        return state;
    }
  }
}

export default new ArtistInfoStore()
