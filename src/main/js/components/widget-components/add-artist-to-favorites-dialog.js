import React from "react";
import ApiClientService from "services/api-client-service";

class AddArtistToFavoritesDialog extends React.Component {

    componentDidMount() {

        ApiClientService.addFavoriteArtist(this.props.artist)
            .then(json => {
                this.setFavoriteArtistMbidList(json);
                this.props.closeDialog();
            })
            .catch(response => {
                this.props.closeDialog();
            });
    }

    render() {
        return null;
    }
}

export default AddArtistToFavoritesDialog