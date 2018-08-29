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

        this.deleteCollection(this.props.collection.collectionName)
            .then(json => {
                this.setState({ serverMessage: "" });
                return this.props.closeDialog();
            })
            .catch(response => {
                return response.text().then(text => { this.setState({ serverMessage: text }); });
            });
    }

    deleteCollection(collectionName) {

        return new Promise((resolve, reject) => {

            ApiClientService.deleteArtistCollection(collectionName)
                .then(json => {
                    this.props.setArtistCollections(json);
                    return resolve(json);
                })
                .catch(response => {

                    return reject(response);
                });
        });
    }

    render() {

        const collection = this.props.collection;

        return (

            <div ref={this.componentRef} className="delete-collection-dialog">

                <form name="delete-collection-form" className="delete-collection-form" onSubmit={this.handleSubmit} >

                    <fieldset>

                        <label> Really delete? </label>

                        <button type="submit" className="submit red-button">
                            Delete
                        </button>

                    </fieldset>

                </form>

            </div>
        );
    }
}

export default DeleteCollectionDialog