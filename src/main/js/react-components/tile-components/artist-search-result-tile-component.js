import React from "react";
import TileExpandingBackground from "graphics/tile-expanding-background";
import AddButton from "components/widget-components/add-button";

class ArtistSearchResultTileComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageMouseEvent: {}
        }

        this.handleMouseEvent = this.handleMouseEvent.bind(this);
    }

    handleMouseEvent(event) {

        event.preventDefault();
        event.stopPropagation();

        if (event.type === "mouseover" || event.type === "mouseout") {

            this.setState({
                imageMouseEvent: Object.assign({}, event)
            });
        }
    }

    render() {

        return (

            <div className="artist-search-result-tile">

                <div className="artist-name">{this.props.artist["artistName"]}</div>

                <div className="artist-image-wrap">

                    <TileExpandingBackground event={this.state.imageMouseEvent} />

                    <AddButton />

                    <img className="artist-image" src={this.props.artist["imageLargeUrl"]}
                        onMouseOver={this.handleMouseEvent}
                        onMouseOut={this.handleMouseEvent}
                    />
                </div>
            </div>
        );
    }
}

export default ArtistSearchResultTileComponent