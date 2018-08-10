import React from "react";
import UserSearchForm from "./user-search-form";
import UserSearchTile from "./user-search-tile";

class UserSearchViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userList: []
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(json) {

        this.setState({
            userList: json
        });
    }

    render() {

        return (

            <div className="user-search-viewer">

                <UserSearchForm {...this.props}
                    handleSearch={this.handleSearch} />


                {
                    (this.state.userList !== null && this.state.userList.length > 0)
                        ?
                            this.state.userList.map(user => {

                                return <UserSearchTile {...this.props}
                                            user={user} />

                            })
                        : ""
                }

            </div>

        );
    }
}

export default UserSearchViewer