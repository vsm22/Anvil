import React from "react";

class FriendTile extends React.Component {

    render() {

        const friend = this.props.friend;

        return (

            <div className="friend-tile">
                {friend.username}
            </div>
        );
    }
}

export default FriendTile