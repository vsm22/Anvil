import React from "react";

const ArtistAlbumsTileComponent = (props) => {

    const album = props.album;
    const albumName = album["name"];
    const albumImageUrl = (album["imageLargeUrl"] !== undefined) ? album["imageLargeUrl"]
        : (album["imageExtraLargeUrl"] !== undefined) ? album["imageExtraLargeUrl"]
            : (album["imageMegaUrl"] !== undefined) ? album["imageMegaUrl"]
                : (album["imageMediumUrl"] !== undefined) ? album["imageMediumUrl"]
                    : (album["imageSmallUrl"] !== undefined) ? album["imageSmallUrl"]
                        : "";

    console.log(albumName + ": "
        + "small: " + album["imageSmallUrl"]
        + "medium: " + album["imageMediumUrl"]
        + "large: " + album["imageLargeUrl"]
        + "extra large: " + album["imageExtraLargeUrl"]
        + "mega: " + album["imageMegaUrl"]);

    return (
        <div className="artist-albums-tile">
            <h1> {albumName} </h1>
            <img src={albumImageUrl}
                alt={""} />
        </div>
    );
}

export default ArtistAlbumsTileComponent