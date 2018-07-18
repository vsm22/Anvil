import React from "react";
import ApiClientService from "services/api-client-service";
import ArtistSearchResultTileComponent from "../tile-components/artist-search-result-tile-component";

class ArtistSearchResultViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistList: []
        };
    }

    componentDidMount() {

        console.log("init search");

        const _this = this;

        const queryRegex = /\?artistName=(.*)/;
        const urlParam = this.props.location.search;
        const artistName = queryRegex.exec(urlParam)[1];

        ApiClientService.getArtistSearch(artistName)
            .then((json) => {

                _this.setState({
                    artistList: json["artistList"]
                });
            });
    }

    render() {

        const props = this.props;

        return (
            <div id="artist-search-result-container">
                <ul>
                    {

                        this.state.artistList.map((artist) => {

                            let artistName = artist["artistName"];

                            return (

                                <li key={artistName}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        props.redirectLocation("/artistInfo?artistName=" + artistName);
                                     }
                                }>

                                        <ArtistSearchResultTileComponent
                                            artist={artist}
                                        />

                                </li>

                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ArtistSearchResultViewerComponent
