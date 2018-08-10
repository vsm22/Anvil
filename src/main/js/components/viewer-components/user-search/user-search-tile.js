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
                this.setState({ serverResponse: response });
            })
    }

    render() {

        return (

            <div className="user-search-tile">

                {this.user.username}

                <form name="add-user-to-friends-form" className="add-user-to-friends-form" onSubmit={this.handleAddUserToFriendsFormSubmit}>
                    <button type="submit">
                        <i className="fas fa-plus"></i>
                        <span>add to friends</span>
                    </button>
                </form>

            </div>
        );
    }
}

export default UserSearchTile