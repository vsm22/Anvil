import React from "react";

class ArtistAlbumsTileComponent extends React.Component {

    render() {

        const album = this.props.album;
        const albumImageUrl = (album.imageLargeUrl !== undefined) ? album.imageLargeUrl :
            (album.imageMediumUrl !== undefined) ? album.imageMediumUrl :
            (album.imageSmallUrl !== undefined) ? album.imageSmallUrl : "";

        return (
            <div className="artist-albums-tile">
                <h1> {album.albumName} </h1>
                <img src={albumImageUrl}
                    alt={""} />
            </div>
        );
    }
}

export default ArtistAlbumsTileComponent