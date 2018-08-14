import React from "react";

class CollectionTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const collection = this.props.collection;

        return (

            <div className="collection-tile">
                { collection.collectionName }
            </div>
        );
    }
}

export default CollectionTile