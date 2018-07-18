import React from "react";
import UserCollectionsService from "services/user-collections-service";

class NewUserArtistCollectionFormComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        let collectionName = document.getElementById("new-user-artist-collection-form").elements["collection-name"].value;

        this.setState({
            collectionName: collectionName
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        UserCollectionsService.createUserArtistCollection(this.state.collectionName);
    }

    render() {

        return (

            <form name="new-artist-collection-form" id="new-user-artist-collection-form" onSubmit={this.handleSubmit}>
                <input type="string" name="collection-name" placeholder="Collection Name" onChange={this.handleChange}/>
                <input type="submit" value="Create" />
            </form>

        );
    }


}

export default NewUserArtistCollectionFormComponent