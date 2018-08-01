import React from "react";
import ApiClientService from "services/api-client-service";

class AddArtistToCollectionDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName: "",
            serverMessage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCollection = this.createCollection.bind(this);
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

        this.createCollection(this.state.collectionName);
    }

    createCollection(collectionName) {

        ApiClientService.createArtistCollection(collectionName)
            .then(() => {

                this.setState({ serverMessage: "" });

                this.props.getArtistCollections();
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

    render() {

        let artist = this.props.artist;
        let artistCollections = this.props.artistCollections;

        return (

            <div className="add-artist-to-collection-dialog hidden">

                <form name="new-collection-form" onSubmit={this.handleSubmit} >
                    <input type="text" name="collection-name" onChange={this.handleChange} />
                    <input type="submit" />
                </form>

                <ul>
                    {
                        artistCollections.map(collection => {

                            return (
                                <li>
                                    { collection.collectionName }
                                </li>
                            );
                        })
                    }
                </ul>

            </div>
        );
    }
}

export default AddArtistToCollectionDialog