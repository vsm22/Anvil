import React from "react";
import ApiClientService from "services/api-client-service";
import ArtistSearchResultTileComponent from "../tile-components/artist-search-result-tile-component";

class ArtistSearchResultViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistList: []
        };

        this.getData = this.getData.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.location.search !== nextProps.location.search) {
            this.getData();
        }

        return true;
    }

    componentDidMount() {

        this.getData();
    }

    getData() {

        const queryRegex = /\?artistName=(.*)/;
        const urlParam = this.props.location.search;

        if (urlParam !== null && urlParam !== undefined && urlParam !== "") {

            const artistName = queryRegex.exec(urlParam)[1];

            ApiClientService.getArtistSearch(artistName)
                .then((json) => {

                    this.setState({
                        artistList: json["artistList"]
                    });
                });
        }
    }

    render() {

        return (
            <div id="artist-search-result-container">

                <ul>
                    {
                        this.state.artistList.map((artist) => {

                            return (

                                <li className="artist-search-result-tile-wrap">

                                    <ArtistSearchResultTileComponent {...this.props}
                                        key={artist.id}
                                        artist={artist} />

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
