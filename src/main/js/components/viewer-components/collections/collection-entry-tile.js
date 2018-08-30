import React from "react";
import CollectionEntryItemToolsNav from "components/widget-components/collection-entry-item-tools-nav";
import { Link } from "react-router-dom";

class ArtistSearchResultTile extends React.Component {

    constructor(props) {
        super(props);

        this.componentRef = React.createRef();
    }

    render() {

        let artist = this.props.artist;

        return (

            <div className="item-card artist-search-result-tile" ref={this.componentRef}>

                <div className="avatar-wrap">
                    <div className="image-wrap">
                        <Link to={"/artistInfo?artistName=" + artist.artistName} >
                            <img className="image" src={ artist.imageLargeUrl } />
                        </Link>
                    </div>
                </div>

                <div className="card-content-wrap">

                    <div className="title">
                        <Link to={"/artistInfo?artistName=" + artist.artistName} >
                            { artist.artistName }
                        </Link>
                    </div>

                    <div className="item-tools-nav-wrap">
                        <CollectionEntryItemToolsNav {...this.props} />
                    </div>

                </div>

            </div>
        );
    }
}

export default ArtistSearchResultTile