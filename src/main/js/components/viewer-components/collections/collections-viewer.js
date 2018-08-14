import React from "react";
import CollectionTile from "./collection-tile";
import AuthenticationService from "services/authentication-service";
import { Link } from "react-router-dom";

class CollectionsViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getArtistCollections();
    }

    render() {

        const collections = this.props.artistCollections;

        return (

            <div className="collections-viewer">

                <ul>
                {
                    (collections !== null && collections !== undefined && collections.length > 0)
                        ?
                            collections.map(collection => {

                                let collectionLink = "/collection?"
                                                        + "username=" + this.props.authentication.username
                                                        + "&collectionName=" + collection.collectionName;

                                return (

                                    <li>
                                        <Link to={collectionLink}>
                                            <CollectionTile {...this.props} collection={collection} />
                                        </Link>
                                    </li>
                                );
                            })
                        : ""

                }
                </ul>

            </div>

        );
    }
}

export default CollectionsViewer