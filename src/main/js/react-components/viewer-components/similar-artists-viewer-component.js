import React from "react";
import SimilarArtistTileComponent from "../tile-components/similar-artist-tile-component";

class SimilarArtistsViewerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredArtist: " "
        }
    }

    render() {
        const _this = this;
        const props = this.props;

        let similarArtists = props.similarArtists.currentQuery.similarArtists.artistList;

        function setHoveredArtist(artistName) {
            _this.setState({ hoveredArtist: artistName });
        }

        return (
            <div id="similar-artists-container">
                <h1> Similar Artists </h1>
                <div className="similar-artist-name-display"> {this.state.hoveredArtist} </div>
                <ul>
                    {
                        similarArtists.map(artist => {
                            let curArtistName = artist["name"];

                            return (
                                <li key={curArtistName}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        props.redirectLocation("/artistInfo?artistName=" + curArtistName);
                                    }
                                    }
                                >
                                    <SimilarArtistTileComponent artist={artist} setHoveredArtist={setHoveredArtist} />
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
