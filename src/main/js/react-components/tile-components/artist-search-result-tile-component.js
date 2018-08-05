import React from "react";
import TileExpandingBackground from "graphics/tile-expanding-background";
import ItemToolsNav from "components/widget-components/item-tools-nav";
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

                <div className="artist-name">
                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                        { artist.artistName }
                    </Link>
                </div>

                <div className="artist-image-wrap">

                    <TileExpandingBackground event={this.state.imageMouseEvent} />

                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                        <img className="artist-image" src={artist["imageLargeUrl"]}
                            onMouseOver={this.handleArtistImageMouseEvent}
                            onMouseOut={this.handleArtistImageMouseEvent}
                        />
                    </Link>
                </div>

                <div className="item-tools-nav-wrap">
                    <ItemToolsNav {...this.props} />
                </div>

            </div>
        );
    }
}

export default ArtistSearchResultTileComponent