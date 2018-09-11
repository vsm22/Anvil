import React from "react";
import SimilarArtistTile from "./similar-artist-tile";
import ApiClientService from "services/api-client-service";
import { Link } from "react-router-dom";

class SimilarArtistsViewer extends React.Component {

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
            }
        }

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

        const _this = this;

        const queryRegex = /\?artistName=(.*)/;
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

            <div className="similar-artists-container">

                <h1> Similar Artists </h1>

                <ul>
                    {
                        this.state.similarArtists.artistList.map(artist => {
                            return (
                                <li>
                                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                                        <SimilarArtistTile artist={artist} {..._this.props} />
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

export default SimilarArtistsViewer