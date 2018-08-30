import React from "react";
import ToolWidget from "components/widget-components/tool-widget";
import RemoveArtistFromCollectionDialog from "components/widget-components/remove-artist-from-collection-dialog";
import RecommmendArtistToFriendDialog from "components/widget-components/recommend-artist-to-friend-dialog";
import LikeArtistButton from "components/widget-components/like-artist-button";

class ItemToolsNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log("Liked artists in nav: " + this.props.likedArtists);

        return (

            <nav className="item-tools-nav">
                <ul>

                    <li>
                        <ToolWidget {...this.props}
                            toolLabel="Remove from collection"
                            toolIconClassName="fas fa-minus"
                            toolDialogComponent={RemoveArtistFromCollectionDialog} />
                    </li>

                    <li>
                        <LikeArtistButton {...this.props} bob={this.props.likedArtists} />
                    </li>

                    <li>
                        <ToolWidget {...this.props}
                            toolLabel="Recommend to a friend"
                            toolIconClassName="fas fa-user"
                            toolDialogComponent={RecommmendArtistToFriendDialog} />
                    </li>

                </ul>
            </nav>
        );
    }
}

export default ItemToolsNav