import React from "react";
import TileExpandingBackground from "graphics/tile-expanding-background";
import AddButton from "components/widget-components/add-button";
import AddArtistToCollectionWidget from "components/widget-components/add-artist-to-collection-widget";
import { Link } from "react-router-dom";

class ArtistSearchResultTileComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageMouseEvent: {}
        }

        this.handleArtistImageMouseEvent = this.handleArtistImageMouseEvent.bind(this);

        this.componentRef = React.createRef();
    }

    handleArtistImageMouseEvent(event) {

        event.preventDefault();
        event.stopPropagation();

        if (event.type === "mouseover" || event.type === "mouseout") {

            this.setState({
                imageMouseEvent: Object.assign({}, event)
            });
        }
    }

    render() {

        let artist = this.props.artist;

        return (

            <div className="artist-search-result-tile" ref={this.componentRef}>

                <div className="artist-name">{artist["artistName"]}</div>

                <AddArtistToCollectionWidget {...this.props} />

                <Link to={"/artistInfo?artistName=" + artist.artistName} >
                    <div className="artist-image-wrap">

                        <TileExpandingBackground event={this.state.imageMouseEvent} />

                        <img className="artist-image" src={artist["imageLargeUrl"]}
                            onMouseOver={this.handleArtistImageMouseEvent}
                            onMouseOut={this.handleArtistImageMouseEvent}
                        />
                    </div>
                </Link>
            </div>
        );
    }
}

export default ArtistSearchResultTileComponent