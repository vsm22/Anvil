import React from "react";

class SimilarArtistTileComponent extends React.Component {

    render() {

        console.log("TILE RENDERED " + this.props.artist);

        return (

            <div className="similar-artist-tile">
                <div className="artist-image-wrap">
                    <img className="artist-image" src={ this.props.artist.imageMediumUrl } />
                </div>
            </div>
        );
    }
}

export default SimilarArtistTileComponent