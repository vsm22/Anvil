import React from "react";

class FriendTile extends React.Component {

    render() {

        const friend = this.props.friend;

        return (

            <div className="user-tile friend-tile">

                <div className="user-info">

                    <div className="icon-wrap">
                        <i className="fas fa-user"></i>
                    </div>

                    <div className="username">
                        {friend.username}
                    </div>

                    <div>
                    </div>

                </div>

            </div>
        );
    }
}

export default FriendTile