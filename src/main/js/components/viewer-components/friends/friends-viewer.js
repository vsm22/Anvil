import React from "react";
import UserSearchViewer from "components/viewer-components/user-search/user-search-viewer";
import MyFriendsViewer from "./my-friends-viewer";
import ApiClientService from "services/api-client-service";

class FriendsViewer extends React.Component {

    render() {

        return (

            <div className="viewer friends-viewer">

                <div className="panel">

                    <h1>
                        <span>
                            <i className="fas fa-users"></i>
                        </span>
                        <span>
                            Friends
                        </span>
                    </h1>

                    <UserSearchViewer {...this.props}/>

                    <MyFriendsViewer {...this.props} />

                </div>

            </div>
        );
    }

}

export default FriendsViewer