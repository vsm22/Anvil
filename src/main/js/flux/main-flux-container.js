import React from "react";
import { Container } from "flux/utils";
import DispatcherActions from "./flux-dispatcher/dispatcher-actions";
import SearchQueryStore from "./flux-data/search-query-store";
import ArtistSearchStore from "./flux-data/artist-search-store";
import ArtistInfoStore from "./flux-data/artist-info-store";
import SimilarArtistsStore from "./flux-data/similar-artists-store";
import ApplicationStateStore from "./flux-data/application-state-store";
import LocationStore from "./flux-data/location-store";
import MainRouter from "../react-router/main-router";

function getStores() {
    return [
        LocationStore,
        SearchQueryStore,
        ArtistSearchStore,
        ArtistInfoStore,
        SimilarArtistsStore,
        ApplicationStateStore
    ];
}

function getState() {
    return {
        // redirect locations
        redirectLocation: DispatcherActions.redirectLocation,
        location: LocationStore.getState(),

        // set search-bar query
        setSearchQuery: DispatcherActions.setSearchQuery,
        searchQuery: SearchQueryStore.getState(),

        // search for an artist
        initArtistSearch: DispatcherActions.initArtistSearch,
        finishArtistSearch: DispatcherActions.finishArtistSearch,
        artistSearchResult: ArtistSearchStore.getState(),

        // load an artist page
        initArtistPageLoad: DispatcherActions.initArtistPageLoad,
        finishArtistPageLoad: DispatcherActions.finishArtistPageLoad,
        artistInfo: ArtistInfoStore.getState(),

        // similar artists
        finishSimilarArtistsLoad: DispatcherActions.finishSimilarArtistsLoad,
        similarArtists: SimilarArtistsStore.getState(),

        // app state
        applicationState: ApplicationStateStore.getState()
    };
}

export default Container.createFunctional(MainRouter, getStores, getState)