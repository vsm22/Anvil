import React from "react";
import ArtistAlbumsTileComponent from "../tile-components/artist-albums-tile-component";
import ApiClientService from "services/api-client-service";

class ArtistAlbumsViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artistAlbums: {
                albumList: [{
                    albumName: "",
                    imageSmallUrl: "",
                    imageMediumUrl: "",
                    imageLargeUrl: "",
                    artist: {
                        artistName: ""
                    },
                    tags: []
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

        ApiClientService.getArtistAlbums(artistName)
            .then((json) => {

                _this.setState({
                    artistAlbums: json
                });
            });
    }

    render() {

        return (
            <div id="artist-albums-wrap">
                <h1> Top Albums </h1>
                <ul className="albums-list">
                    {
                        this.state.artistAlbums.albumList.map(album => {
                            return (
                                <li>
                                    <ArtistAlbumsTileComponent album={album} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ArtistAlbumsViewerComponent