import React from "react";

const DevViewerComponent = (props) => (
    <div>
        <h1>artistSearchResults:</h1> <p>{JSON.stringify(props.artistSearchResult)}</p>
        <h1>artistInfo:</h1> <p> {JSON.stringify(props.artistInfo)}</p>
        <h1>similarArtists:</h1> <p> {JSON.stringify(props.similarArtists)}</p>
    </div>
);

export default DevViewerComponent
