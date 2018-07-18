import React from "react";
import SimilarArtistTileComponent from "../tile-components/similar-artist-tile-component";

class SimilarArtistsViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            similarArtists: {
            }
        }

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(event) {

        event.preventDefault();
        event.stopPropagation();


    }

    render() {

        const _this = this;

        let similarArtists = this.props.similarArtists;

        return (

            <div id="similar-artists-container">

                <h1> Similar Artists </h1>

                <div className="similar-artist-name-display"> {this.state.hoveredArtist} </div>

                <ul>
                    {
                        similarArtists.artistList.map(artist => {

                            let curArtistName = artist["name"];

                            return (
                                <li key={curArtistName}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        props.redirectLocation("/artistInfo?artistName=" + curArtistName);
                                    }
                                    }
                                >
                                    <SimilarArtistTileComponent artist={artist} setHoveredArtist={this.handleHover} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default SimilarArtistsViewerComponent
