import {ReduceStore} from "flux/utils";

import MainDispatcher from "../flux-dispatcher/main-dispatcher";
import ActionTypes from "../flux-dispatcher/action-types";
import DispatcherActions from "../flux-dispatcher/dispatcher-actions";
import SimilarArtistsService from "../../services/similar-artists-service";

class SimilarArtistsStore extends ReduceStore {
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
        similarArtists: {
          artistList: [{
            "name": "",
            "imageSmallUrl": "",
            "imageMediumUrl": "",
            "imageLargeUrl": "",
            "bio": ""
          }]
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
              similarArtists: state.cache.get(action.query),
            },
            cache: state.cache.set(action.query, {
              lastAccessed: Date.now(),
              similarArtists: state.cache.get(action.query).similarArtists
            })
          };
        }
        else {
          SimilarArtistsService.getXHRPromise(action.query)
            .then(result => {
              DispatcherActions.finishSimilarArtistsLoad(result);
            }
          );
          return {
            currentQuery: {
              artistName: action.query,
              similarArtists: [{}]
            },
            cache: state.cache
          };
        }

      case ActionTypes.FINISH_SIMILAR_ARTISTS_LOAD:
        return {
          currentQuery: {
            artistName: state.currentQuery.artistName,
            similarArtists: action.result
          },
          cache: state.cache.set(state.currentQuery.artistName,
            {
              lastAccessed: Date.now(),
              similarArtists: action.result
            }
          )
        };

      default:
        return state;
    }
  }
}

export default new SimilarArtistsStore()
