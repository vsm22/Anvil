import React from "react";
import ToolWidget from "components/widget-components/tool-widget";
import AddArtistToCollectionDialog from "components/widget-components/add-artist-to-collection-dialog";
import RecommmendArtistToFriendDialog from "components/widget-components/recommend-artist-to-friend-dialog";

class ItemToolsNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <nav className="item-tools-nav">
                <ul>

                    <li>
                        <ToolWidget {...this.props}
                            toolLabel="Add to a collection"
                            toolIconClassName="fas fa-plus"
                            toolDialogComponent={AddArtistToCollectionDialog} />
                    </li>

                    <li>
                        <ToolWidget {...this.props}
                            toolLabel="Save to favorites"
                            toolIconClassName="fas fa-heart"
                            toolDialogComponent={AddArtistToCollectionDialog} />
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