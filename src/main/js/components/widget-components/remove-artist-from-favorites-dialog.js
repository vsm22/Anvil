import React from "react";
import ApiClientService from "services/api-client-service";

class RemoveArtistFromFavoritesDialog extends React.Component {

    componentDidMount() {

        ApiClientService.removeFavoriteArtist(this.props.artist)
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

export default RemoveArtistFromFavoritesDialog