import React from "react";

class SimilarArtistTile extends React.Component {

    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.componentRef = React.createRef();
    }

    handleMouseOver(event) {

        event.preventDefault();
        event.stopPropagation();

        let artistNameDiv = this.componentRef.current.querySelector(".artist-name");

        artistNameDiv.classList.remove("hidden");
        artistNameDiv.classList.add("visible");
    }

    handleMouseOut(event) {

        event.preventDefault();
        event.stopPropagation();

        let artistNameDiv = this.componentRef.current.querySelector(".artist-name");

        artistNameDiv.classList.remove("visible");
        artistNameDiv.classList.add("hidden");
    }

    render() {

        return (

            <div className="similar-artist-tile" ref={this.componentRef} >

                <div className="artist-image-wrap" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <img className="artist-image" src={ this.props.artist.imageMediumUrl } />
                </div>

                <div className="artist-name hidden">
                    { this.props.artist.artistName }
                </div>
            </div>
        );
    }
}

export default SimilarArtistTile