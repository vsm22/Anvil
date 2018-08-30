import React from "react";
import ApiClientService from "services/api-client-service";

class RecommendArtistToFriendDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverResponse: "",
            selectedFriend: "",
            friendsArtistWasRecommendedTo: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFriendsArtistWasRecommendedTo = this.getFriendsArtistWasRecommendedTo.bind(this);

        this.componentRef = React.createRef();
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        let form = this.componentRef.current.querySelector(".recommend-artist-to-friend-form");

        this.setState({
            selectedFriend: form.elements["friend-username-select"].value
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        let artist = this.props.artist;
        let friend = this.state.selectedFriend;

        ApiClientService.recommendArtist(artist, friend)
            .then(json => {

                this.setState({
                    friendsArtistWasRecommendedTo: json,
                    serverResponse: ""
                });

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

                <form name="recommend-artist-to-friend-form" className="recommend-artist-to-friend-form" onSubmit={this.handleSubmit} >

                    <fieldset>

                        <select name="friend-username-select" onChange={this.handleChange} >
                            <option value="" selected disabled hidden> select friend </option>

                            {
                                friends.map(friend => {

                                    let isRecommended = (this.state.friendsArtistWasRecommendedTo.includes(friend.username));

                                    return ((isRecommended === false)
                                        ?
                                            <option value={friend.username}>
                                                {friend.username}
                                            </option>
                                        :
                                            <option value="" disabled>
                                                &#10004; {friend.username}
                                            </option>
                                        );
                                })
                            }
                        </select>

                        {
                            (!this.state.friendsArtistWasRecommendedTo.includes(this.state.selectedFriend))
                                 ?
                                    <button type="submit" className="submit">
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                 :
                                    <button type="submit" className="submit white green-background" disabled>
                                        <i className="fas fa-check"></i>
                                    </button>
                        }
                    </fieldset>

                </form>

                <div className="server-response-message">
                    { this.state.serverMessage }
                </div>

            </div>
        );
    }
}

export default RecommendArtistToFriendDialog