import React from "react";
import CollectionTile from "./collection-tile";
import AuthenticationService from "services/authentication-service";
import ApiClientService from "services/api-client-service";
import { Link } from "react-router-dom";

class CollectionsViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName: "",
            serverMessage: ""
        }

        this.handleNewCollectionChange = this.handleNewCollectionChange.bind(this);
        this.handleNewCollectionSubmit = this.handleNewCollectionSubmit.bind(this);

        this.componentRef = React.createRef();
    }

    handleNewCollectionSubmit(event) {

        event.preventDefault();

        ApiClientService.createArtistCollection(this.state.collectionName)
            .then((response) => {

                this.setState({ serverMessage: "" });

                response.json().then(json => {
                    this.props.setArtistCollections(json);
                });
            })
            .catch(response => {

                if (response.status === 409) {
                    this.setState({
                        serverMessage: "Collection with this name already exists"
                    });
                } else {
                    this.setState({ serverMessage: "" });
                }
            });
    }

    handleNewCollectionChange(event) {

        event.preventDefault();
        event.stopPropagation();

        let collectionName = this.componentRef.current.querySelector(".new-collection-form").elements["new-collection-name"].value;

        this.setState({
            collectionName: collectionName
        });
    }

    componentDidMount() {
        this.props.getArtistCollections();
    }

    render() {

        const collections = this.props.artistCollections;

        return (

            <div className="viewer collections-viewer" ref={this.componentRef}>

                <div className="panel collections-panel">

                    <h1>
                        <span>
                            <i className="far fa-list-alt"></i>
                        </span>
                        <span>
                            Collections
                        </span>
                    </h1>

                    <form name="new-collection-form" className="new-collection-form" onSubmit={this.handleNewCollectionSubmit}>
                        <input type="text" name="new-collection-name" placeholder="create new collection" onChange={this.handleNewCollectionChange} />
                        <button type="submit">
                            <i class="fas fa-plus"></i>
                        </button>
                    </form>

                    <ul>
                    {
                        (collections !== null && collections !== undefined && collections.length > 0)
                            ?
                                collections.map(collection => {

                                    let collectionLink = "/collection?"
                                                            + "username=" + this.props.authentication.username
                                                            + "&collectionName=" + collection.collectionName;

                                    return (

                                        <li className="item-card-wrap">
                                            <CollectionTile {...this.props} collection={collection} link={collectionLink}/>
                                        </li>
                                    );
                                })
                            : ""

                    }
                    </ul>

                </div>

            </div>

        );
    }
}

export default CollectionsViewer