import React from "react";
import ApiClientService from "services/api-client-service";

class RemoveArtistFromCollectionDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverMessage: ""
        }

        this.handleCloseDialogSubmit = this.handleCloseDialogSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeArtistFromCollection = this.removeArtistFromCollection.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        this.removeArtistFromCollection(this.props.collectionName, this.props.artist.artistName)
            .then(json => {
                this.setState({ serverMessage: "" });
                return this.props.closeDialog();
            })
            .catch(response => {
                return response.text().then(text => { this.setState({ serverMessage: text }); });
            });
    }

    removeArtistFromCollection(collectionName, artistName) {

        return new Promise((resolve, reject) => {

            ApiClientService.removeArtistFromCollection(collectionName, artistName)
                .then(json => {
                    this.props.setCollectionData(json);
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

            <div ref={this.componentRef} className="remove-artist-from-collection-dialog">

                <form name="remove-artist-from-collection-form" className="remove-artist-from-collection-form" onSubmit={this.handleSubmit} >

                    <fieldset>

                        <label> Really remove? </label>

                        <button type="submit" className="submit red-button">
                            Remove
                        </button>

                    </fieldset>

                </form>

                <div className="server-response-message">
                    { this.state.serverMessage }
                </div>
            </div>
        );
    }
}

export default RemoveArtistFromCollectionDialog