import React from "react";

const SimilarArtistTileComponent = (props) => (
      <div>
        <div>{props.artist["name"]}</div>
        <img src={props.artist["imageExtraLargeUrl"]} />
      </div>
);

export default SimilarArtistTileComponent
