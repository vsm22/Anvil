import React from "react";

class SimilarArtistTile extends React.Component {

    render() {

        return (

            <div className="similar-artist-tile">
                <div className="artist-image-wrap">
                    <img className="artist-image" src={ this.props.artist.imageMediumUrl } />
                </div>
            </div>
        );
    }
}

export default SimilarArtistTile