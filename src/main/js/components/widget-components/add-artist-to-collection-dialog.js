import React from "react";
import ApiClientService from "services/api-client-service";

class AddArtistToCollectionDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            artist: this.props.artist,
            collectionName: "",
            serverMessage: ""
        }

        this.handleCloseDialogSubmit = this.handleCloseDialogSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCollection = this.createCollection.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            collectionName: document.querySelector("form[name='new-collection-form']").elements["collection-name"].value
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        this.createCollection(this.state.collectionName)
            .then(() => {
                ApiClientService.addArtistToCollection(this.state.artist, this.state.collectionName);
            });
    }

    handleMenuItemSubmit(event, collectionName) {

        ApiClientService.addArtistToCollection(this.state.artist, collectionName);
    }

    createCollection(collectionName) {

        return new Promise((resolve, reject) => {

            ApiClientService.createArtistCollection(collectionName)
                .then((response) => {

                    this.setState({ serverMessage: "" });

                    response.json().then(json => {
                        this.props.setArtistCollections(json);
                        return resolve(json);
                    });
                })
                .catch(response => {

                    if (response.status === 409) {
                        this.setState({
                            serverMessage: "Collection with this name already exists"
                        });
                        return reject(response);
                    } else {
                        this.setState({ serverMessage: "" });
                        return reject(response);
                    }
                });
        });
    }

    componentDidMount() {

        this.props.getArtistCollections();
    }

    render() {

        const artist = this.state.artist;
        const artistCollections = this.props.artistCollections;

        return (

            <div ref={this.componentRef} className="add-artist-to-collection-dialog">

                <header>

                    <form name="close-dialog-form" className="close-dialog-form" onSubmit={this.handleCloseDialogSubmit}>
                        <button type="submit" className="submit">
                            <i className="fas fa-times"></i>
                        </button>
                    </form>

                    <h1>
                        Add <b>{artist.artistName}</b> to Collection
                    </h1>

                </header>

                <h2>
                    Add to new collection:
                </h2>

                <form name="new-collection-form" className="new-collection-form" onSubmit={(event) => { this.handleSubmit(event, artist); }} >
                    <input type="text" name="collection-name" className="collection-name" placeholder="Collection Name" onChange={this.handleChange} />
                    <button type="submit" className="submit">
                        <i className="fas fa-plus"></i>
                    </button>
                </form>

                <h2>
                    Add to existing collection:
                </h2>

                <nav>
                    <ul>
                        {
                            artistCollections.map(collection => {

                                return (
                                    <li className="menu-item" onClick={(event) => { this.handleMenuItemSubmit(event, collection.collectionName); }}>

                                        <div className="collection-name">
                                            { collection.collectionName }
                                        </div>

                                        <i className="fas fa-plus"></i>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>

            </div>
        );
    }
}

export default AddArtistToCollectionDialog