import React from "react";
import UserSearchViewer from "components/viewer-components/user-search/user-search-viewer";
import MyFriendsViewer from "./my-friends-viewer";
import ApiClientService from "services/api-client-service";

class FriendsViewer extends React.Component {

    render() {

        return (

            <div className="friends-viewer">

                <UserSearchViewer {...this.props}/>

                <MyFriendsViewer {...this.props} />

            </div>
        );
    }

}

export default FriendsViewer