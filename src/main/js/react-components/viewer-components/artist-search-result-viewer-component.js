import React from "react";
import ArtistSearchResultTileComponent from "../tile-components/artist-search-result-tile-component";

class ArtistSearchResultViewerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("init search");
        const queryRegex = /\?artistName=(.*)/;
        const urlParam = this.props.location.search;
        const artistName = queryRegex.exec(urlParam)[1];
        this.props.initArtistSearch(artistName);
    }

    render() {
        const props = this.props;
        const artistList = props.artistSearchResult.currentQuery.artistList;

        return (
            <div id="artist-search-result-container">
                <ul>
                    {
                        artistList.map((artistResultJSON) => {
                            let curArtistName = artistResultJSON["name"];

                            return (
                                <li key={curArtistName}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        props.redirectLocation("/artistInfo?artistName=" + curArtistName);
                                    }
                                    }>
                                    <ArtistSearchResultTileComponent
                                        artistResultJSON={artistResultJSON}
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
