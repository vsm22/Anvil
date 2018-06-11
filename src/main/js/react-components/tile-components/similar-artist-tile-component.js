import React from "react";

const SimilarArtistTileComponent = (props) => (
    <div className="similar-artist-tile">
        <div className="artist-image-wrap">
            <img className="artist-image"
                src={props.artist["imageMediumUrl"]}
                onMouseOver={() => { props.setHoveredArtist(props.artist["name"]) }}
            />
        </div>
    </div>
);

export default SimilarArtistTileComponent