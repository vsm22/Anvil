import React from "react";
import ApiClientService from "services/api-client-service";

class RecommendArtistToFriendDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverResponse: "",
            friendsArtistWasRecommendedTo: []
        }

        this.handleCloseDialogSubmit = this.handleCloseDialogSubmit.bind(this);
        this.handleMenuItemSubmit = this.handleMenuItemSubmit.bind(this);
        this.getFriendsArtistWasRecommendedTo = this.getFriendsArtistWasRecommendedTo.bind(this);

        this.componentRef = React.createRef();
    }

    handleCloseDialogSubmit(event) {

        event.preventDefault();

        this.props.closeDialog(event);
    }

    handleMenuItemSubmit(event, artist, friend) {

        ApiClientService.recommendArtist(artist, friend)
            .then(response => {

                this.setState((prevState, props) => {
                    friendsArtistWasRecommendedTo: prevState.friendsArtistWasRecommendedTo.concat(friend.username)
                });

                this.setState({ serverResponse: "" });
            })
            .catch(response => {
                response.text()
                    .then(text => { this.setState({ serverResponse: text }); });
            })
    }

    getFriendsArtistWasRecommendedTo(artist) {

        ApiClientService.getFriendsArtistWasRecommendedTo(artist)
            .then(usernames => {

                this.setState({
                    friendsArtistWasRecommendedTo: usernames
                });
            })
            .catch(response => {
            });
    }

    componentDidMount() {
        this.props.getFriends();
        this.getFriendsArtistWasRecommendedTo(this.props.artist);
    }

    render() {

        const artist = this.props.artist;
        const friends = this.props.friends;
        const friendsArtistWasRecommendedTo = this.state.friendsArtistWasRecommendedTo;

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

                                // If friend has already received a recommendation for this artist from current user
                                if (friendsArtistWasRecommendedTo.includes(friend.username)) {

                                    return (

                                        <li className="menu-item">

                                            <div className="label friend-name">
                                                { friend.username }
                                            </div>

                                            <i className="fas fa-check green"></i>
                                        </li>
                                    );

                                } else {

                                    return (

                                        <li className="menu-item" onClick={(event) => { this.handleMenuItemSubmit(event, artist, friend); }}>

                                            <div className="label friend-name">
                                                { friend.username }
                                            </div>

                                            <i className="fas fa-plus"></i>
                                        </li>
                                    );
                                }
                            })
                        }
                    </ul>
                </nav>

                <div className="server-response-message">
                    { this.state.serverResponse }
                </div>

            </div>
        );
    }
}

export default RecommendArtistToFriendDialog