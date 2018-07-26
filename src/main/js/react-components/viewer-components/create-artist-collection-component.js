import React from "react";
import ApiClientService from "services/api-client-service";

class CreateArtistCollectionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName: "",
            serverMessage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            collectionName: document.querySelector("form[name='create-artist-collection-form']").elements["collection-name"].value
        });
    }

    handleSubmit() {

        event.preventDefault();
        event.stopPropagation();

        ApiClientService.createArtistCollection(this.state.collectionName)
            .then(() => {

                this.setState({ serverMessage: "" });
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

        return (

            <div>
                <form name="create-artist-collection-form" id="create-artist-collection-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="collection-name" onChange={this.handleChange} placeholder="Collection name" />
                    <input type="submit" value="Submit" />
                </form>

                <div className = "server-response-message">{this.state.serverMessage}</div>
            </div>
        );
    }
}

export default CreateArtistCollectionComponent