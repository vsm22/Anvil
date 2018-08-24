import React from "react";
import ApiClientService from "services/api-client-service";

class DeleteCollectionDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverMessage: ""
        }

        this.handleCloseDialogSubmit = this.handleCloseDialogSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        this.deleteCollection(this.props.collection.collectionName);
    }

    deleteCollection(collectionName) {

        ApiClientService.deleteArtistCollection(collectionName)
            .then((response) => {

                this.setState({ serverMessage: "" });

                response.json().then(json => {
                    this.props.setArtistCollections(json);
                    return resolve(json);
                });
            })
            .catch(response => {

                this.setState({ serverMessage: "" });
                return reject(response);
            });
    }

    render() {

        const collection = this.props.collection;

        return (

            <div ref={this.componentRef} className="add-artist-to-collection-dialog">

                <header>

                    <form name="close-dialog-form" className="close-dialog-form" onSubmit={this.handleCloseDialogSubmit}>
                        <button type="submit" className="submit">
                            <i className="fas fa-times"></i>
                        </button>
                    </form>

                    <h1>
                        Delete <b>{collection.collectionName}</b> collection?
                    </h1>

                </header>

                <form name="delete-collection-form" className="delete-collection-form" onSubmit={this.handleSubmit} >
                    <button type="submit" className="submit">
                        Delete
                    </button>
                </form>

            </div>
        );
    }
}

export default DeleteCollectionDialog