import React from "react";
import ApiClientService from "services/api-client-service";

class RecommendArtistToFriendDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverResponse: ""
        }

        this.handleCloseDialogSubmit = this.handleCloseDialogSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleMenuItemSubmit(event, artist, friend) {

        ApiClientService.recommendArtist(artist, friend)
            .then(response => {
                this.setState({ serverResponse: "" });
            })
            .catch(response => {
                this.setState({ serverResponse: response});
            })
    }

    componentDidMount() {
        this.props.getFriends();
    }

    render() {

        const artist = this.props.artist;
        const friends = this.props.friends;

        return (

            <div ref={this.componentRef} className="recommend-artist-to-friend-dialog">

                <header>

                    <form name="close-dialog-form" className="close-dialog-form" onSubmit={this.handleCloseDialogSubmit}>
                        <button type="submit" className="submit">
                            <i className="fas fa-times"></i>
                        </button>
                    </form>

                    <h1>
                        Recommend <b>{artist.artistName}</b> to a friend
                    </h1>

                </header>

                <h2>
                    Friends:
                </h2>

                <nav>
                    <ul>
                        {
                            friends.map(friend => {

                                return (
                                    <li className="menu-item" onClick={(event) => { this.handleMenuItemSubmit(event, artist, friend); }}>

                                        <div className="label friend-name">
                                            { friend.username }
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

export default RecommendArtistToFriendDialog