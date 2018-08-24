import React from "react";
import CollectionTileToolsNav from "components/widget-components/collection-tile-tools-nav";
import { Link } from "react-router-dom";

class CollectionTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const collection = this.props.collection;
        const link = this.props.link;
        const imageUrl = (collection.artistListEntries !== null && collection.artistListEntries !== undefined && collection.artistListEntries.length > 0) ? collection.artistListEntries[0].artist.imageLargeUrl : "";
        const numItems = (collection.artistListEntries !== null && collection.artistListEntries !== undefined && collection.artistListEntries.length > 0) ? collection.artistListEntries.length : undefined;

        return (

            <div className="item-card collection-tile">

                <img className="background-image" src={imageUrl} />

                <div className="avatar-wrap">
                    {
                        (imageUrl !== "")
                            ?
                                <Link to={link}>
                                    <div className="image-wrap">
                                        <img className="image" src={imageUrl} />
                                    </div>
                                </Link>
                            : ""
                    }
                </div>

                <div className="card-content-wrap">

                    <div className="title">
                        <Link to={link}>
                            <span>
                                { collection.collectionName }
                            </span>
                            <span>
                                {
                                    (numItems !== undefined)
                                        ? "(" + numItems + ") items"
                                        : "(0) items"
                                }
                            </span>
                        </Link>
                    </div>

                    <div className="info">
                        {
                            (collection.artistListEntries !== undefined && collection.artistListEntries !== null && collection.artistListEntries.length > 0)
                                ?
                                    <span>

                                        includes:&nbsp;

                                        <span>
                                            {
                                                collection.artistListEntries[0].artist.artistName
                                                + collection.artistListEntries
                                                    .slice(1, 4)
                                                    .map(entry => ", " + entry.artist.artistName)
                                            }
                                        </span>
                                    </span>
                                : ""
                        }
                    </div>

                    <div className="item-tools-nav-wrap">
                        <CollectionTileToolsNav {...this.props} collection={collection} />
                    </div>

                </div>
            </div>
        );
    }
}

export default CollectionTile