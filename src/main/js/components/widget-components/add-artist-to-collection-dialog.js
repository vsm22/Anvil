import React from "react";
import ApiClientService from "services/api-client-service";

class AddArtistToCollectionDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newCollectionName: "",
            existingCollectionName: "",
            serverMessage: ""
        }

        this.handleExistingCollectionChange = this.handleExistingCollectionChange.bind(this);
        this.handleExistingCollectionSubmit = this.handleExistingCollectionSubmit.bind(this);

        this.handleNewCollectionChange = this.handleNewCollectionChange.bind(this);
        this.handleNewCollectionSubmit = this.handleNewCollectionSubmit.bind(this);

        this.setNewCollectionSuccess = this.setNewCollectionSuccess.bind(this);
        this.setExistingCollectionSuccess = this.setExistingCollectionSuccess.bind(this);

        this.createCollection = this.createCollection.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleNewCollectionChange(event) {

        event.preventDefault();
        event.stopPropagation();

        const form = this.componentRef.current.querySelector("form[name='new-collection-form']");

        this.setState({
            newCollectionName: form.elements["new-collection-name"].value
        });
    }

    handleNewCollectionSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        this.createCollection(this.state.newCollectionName)
            .then(() => {
                ApiClientService.addArtistToCollection(this.props.artist, this.state.newCollectionName)
                    .then(() => {
                        this.setNewCollectionSuccess();
                    });
            });
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

    handleExistingCollectionChange(event) {

        event.preventDefault();
        event.stopPropagation();

        const form = this.componentRef.current.querySelector("form[name='existing-collection-form']");

        this.setState({
            existingCollectionName: form.elements["existing-collection-name"].value
        });
    }

    handleExistingCollectionSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        ApiClientService.addArtistToCollection(this.props.artist, this.state.existingCollectionName)
            .then(() => {
                this.setExistingCollectionSuccess();
            })
            .catch(response => {

                if (response.status === 409) {
                    this.setState({
                        serverMessage: "Artist is already in collection"
                    })
                } else {
                   response.text().then(text => {
                        this.setState({ serverMessage: text });
                    });
                }
            });
    }

    setNewCollectionSuccess() {

        const form = this.componentRef.current.querySelector("form[name='new-collection-form'");
        const button = form.querySelector(".submit");
        const icon = button.querySelector("i");

        icon.classList.replace("fa-plus", "fa-check");
        icon.classList.add("white");
        button.classList.add("green-background");
        button.setAttribute("disabled", "true");

        this.setState({
            serverMessage: ""
        });
    }

    setExistingCollectionSuccess() {

        const form = this.componentRef.current.querySelector("form[name='existing-collection-form'");
        const button = form.querySelector(".submit");
        const icon = button.querySelector("i");

        icon.classList.replace("fa-plus", "fa-check");
        icon.classList.add("white");
        button.classList.add("green-background");
        button.setAttribute("disabled", "true");

        this.setState({
            serverMessage: ""
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

                <form name="new-collection-form" className="new-collection-form" onSubmit={this.handleNewCollectionSubmit} >

                    <fieldset>
                        <input type="text" name="new-collection-name" className="new-collection-name" placeholder="create new" onChange={this.handleNewCollectionChange} />

                        <button type="submit" className="submit">
                            <i className="fas fa-plus"></i>
                        </button>
                    </fieldset>

                </form>

                <form name="existing-collection-form" className="existing-collection-form" onSubmit={this.handleExistingCollectionSubmit} >
                    <fieldset>

                        <select name="existing-collection-name" onChange={this.handleExistingCollectionChange} >
                            <option value="" selected disabled hidden> select existing </option>

                            {
                                artistCollections.map(collection => {

                                    return (
                                        <option value={collection.collectionName}>
                                            {collection.collectionName}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <button type="submit" className="submit">
                            <i className="fas fa-plus"></i>
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

export default AddArtistToCollectionDialog