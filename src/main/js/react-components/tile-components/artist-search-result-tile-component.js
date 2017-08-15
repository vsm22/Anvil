import React from "react";

const ArtistSearchResultTileComponent = (props) => {
  let artistName = props.artistResultJSON["name"];

  return (
    <div className="artist-search-result-tile">
      <div className="artist-name">{artistName}</div>
      <div className="artist-image-wrap">
        <img className="artist-image"
              src={props.artistResultJSON["imageLargeUrl"]}
              alt={artistName}
        />
      </div>
    </div>
  );
}

export default ArtistSearchResultTileComponent
