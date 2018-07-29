import React from "react";
import SimilarArtistTileComponent from "../tile-components/similar-artist-tile-component";
import ApiClientService from "services/api-client-service";
import { Link } from "react-router-dom";

class SimilarArtistsViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            similarArtists: {
                artistList: [{
                    artistName: "",
                    imageSmallUrl: "",
                    imageMediumUrl: "",
                    imageLargeUrl: ""
                }]
            },
            hoveredArtistName: "placeholder"
        }

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

        const _this = this;

        const queryRegex = /\?artistName=(.*)/;
        const urlParam = this.props.location.search;
        const artistName = queryRegex.exec(urlParam)[1].replace("%20", " ");

        ApiClientService.getSimilarArtists(artistName)
            .then((json) => {

                _this.setState({
                    similarArtists: json
                });
            });
    }

    render() {

        const _this = this;

        return (

            <div id="similar-artists-container">

                <h1> Similar Artists </h1>
                <div className="similar-artist-name-display"> {this.state.hoveredArtistName} </div>

                <ul>
                    {
                        this.state.similarArtists.artistList.map(artist => {
                            return (
                                <li>
                                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                                        <SimilarArtistTileComponent artist={artist} {..._this.props} />
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

export default SimilarArtistsViewerComponent