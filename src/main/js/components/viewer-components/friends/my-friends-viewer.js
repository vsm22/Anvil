import React from "react";
import FriendTile from "./friend-tile";
import ApiClientService from "services/api-client-service";

class MyFriendsViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            serverResponse: ""
        }
    }

    componentDidMount() {

        this.props.getFriends();
    }

    render() {

        return (
            <div className="my-friends-viewer">

                <ul className="my-friends-list">

                    {
                        (this.props.friends !== null && this.props.friends.length > 0)
                            ?
                                this.props.friends.map(friend => <FriendTile {...this.props} friend={friend} /> )
                            : ""
                    }

                </ul>

            </div>
        );
    }
}

export default MyFriendsViewer