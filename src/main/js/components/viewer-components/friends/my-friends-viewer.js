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

                <ul className="user-list">

                    {
                        (this.props.friends !== null && this.props.friends.length > 0)
                            ?
                                <div>
                                    <h1> My friends: </h1>
                                    {
                                        this.props.friends.map(friend => {
                                            return (
                                                        <li className="user-tile-wrap">
                                                            <FriendTile {...this.props} friend={friend} />
                                                        </li>
                                                   );
                                            })
                                    }
                                </div>

                            : ""
                    }

                </ul>

            </div>
        );
    }
}

export default MyFriendsViewer