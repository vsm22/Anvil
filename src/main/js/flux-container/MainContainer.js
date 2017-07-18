import {Container} from "flux/utils";
import DispatcherActions from "../flux-dispatcher/DispatcherActions";
import RootComponent from "../react-components/RootComponent";
import SearchQueryStore from "../flux-data/SearchQueryStore";
import ArtistSearchStore from "../flux-data/ArtistSearchStore";
import ArtistInfoStore from "../flux-data/ArtistInfoStore";

function getStores() {
  return [ ArtistSearchStore,
    SearchQueryStore,
    ArtistInfoStore
  ];
}

function getState() {
  return {
    initArtistSearch: DispatcherActions.initArtistSearch,
    finishArtistSearch: DispatcherActions.finishArtistSearch,
    setSearchQuery: DispatcherActions.setSearchQuery,
    initArtistPageLoad: DispatcherActions.initArtistPageLoad,
    finishArtistPageLoad: DispatcherActions.finishArtistPageLoad,
    searchQuery: SearchQueryStore.getState(),
    artistSearchResult: ArtistSearchStore.getState(),
    artistInfo: ArtistInfoStore.getState()
  }
}

export default Container.createFunctional(RootComponent, getStores, getState)
