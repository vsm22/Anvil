import React from "react";
import ApiClientService from "services/api-client-service";
import ArtistSearchResultTile from "./artist-search-result-tile";

class ArtistSearchResultViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistList: []
        };

        this.getData = this.getData.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.location.search !== nextProps.location.search) {
            this.getData(nextProps.location.search);
        }

        return true;
    }

    componentDidMount() {

        this.getData(this.props.location.search);
    }

    getData(urlParam) {

        const queryRegex = /\?artistName=(.*)/;

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

                                    <ArtistSearchResultTile {...this.props}
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

export default ArtistSearchResultViewer