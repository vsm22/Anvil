import React from "react";
import ToolWidget from "components/widget-components/tool-widget";
import DeleteCollectionDialog from "components/widget-components/delete-collection-dialog";

class CollectionTileToolsNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <nav className="item-tools-nav">
                <ul>

                    <li>
                        <ToolWidget {...this.props}
                            toolLabel="Delete collection"
                            toolIconClassName="fas fa-minus-square"
                            toolDialogComponent={DeleteCollectionDialog} />
                    </li>

                </ul>
            </nav>
        );
    }
}

export default CollectionTileToolsNav