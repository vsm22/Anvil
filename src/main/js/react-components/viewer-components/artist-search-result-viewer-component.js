import React from "react";
import ApiClientService from "services/api-client-service";
import ArtistSearchResultTileComponent from "../tile-components/artist-search-result-tile-component";
import { Link } from "react-router-dom";
import AddArtistToCollectionWidget from "components/widget-components/add-artist-to-collection-widget";

class ArtistSearchResultViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistList: []
        };
    }

    componentDidMount() {

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

        return (
            <div id="artist-search-result-container">

                <AddArtistToCollectionWidget {...this.props} />

                <ul>
                    {
                        this.state.artistList.map((artist) => {
                            return (
                                <li>
                                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                                        <ArtistSearchResultTileComponent artist={artist} />
                                    </Link>
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
