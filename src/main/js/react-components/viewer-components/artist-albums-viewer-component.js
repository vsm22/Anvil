import React from "react";
import ArtistAlbumsTileComponent from "../tile-components/artist-albums-tile-component";

class ArtistAlbumsViewerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const _this = this;
        const props = this.props;
        const albumList = props.artistInfo.currentQuery.artistInfo["albumList"];

        return (
            <div id="artist-albums-wrap">
                <h1> Top Albums </h1>
                <ul className="albums-list">
                    {
                        albumList.map(album => {
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
