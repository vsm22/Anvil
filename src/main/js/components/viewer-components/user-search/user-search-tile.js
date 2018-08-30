import React from "react";
import ApiClientService from "services/api-client-service";

class UserSearchTile extends React.Component {

    constructor(props) {
        super(props);

        this.user = this.props.user;

        this.state = {
            serverResponse: ""
        }

        this.handleAddUserToFriendsFormSubmit = this.handleAddUserToFriendsFormSubmit.bind(this);
    }

    handleAddUserToFriendsFormSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        ApiClientService.addUserToFriends(this.user.username)
            .then(json => {
                this.props.setFriends(json);
                this.setState({ serverResponse: "" });
            })
            .catch(response => {

                response.text().then(text => {
                    this.setState({ serverResponse: text });
                });
            })
    }

    render() {

        return (

            <div className="user-tile">

                <div className="user-info">

                    <div className="username">
                        {this.user.username}
                    </div>

                    <form name="add-user-to-friends-form" className="add-user-to-friends-form" onSubmit={this.handleAddUserToFriendsFormSubmit}>
                    {
                        (this.props.isFriend === false)
                            ?
                                <button type="submit" className="submit">
                                    <i className="fas fa-user-plus"></i>
                                </button>
                            :
                                <button type="submit" disabled="true" className="submit white green-background">
                                    <i className="fas fa-user-check"></i>
                                </button>
                    }
                    </form>

                </div>

                <div className="server-response-message">
                    { this.state.serverResponse }
                </div>

            </div>
        );
    }
}

export default UserSearchTile