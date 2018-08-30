import React from "react";
import UserSearchForm from "./user-search-form";
import UserSearchTile from "./user-search-tile";
import ApiClientService from "services/api-client-service";

class UserSearchViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userList: []
        };

        this.getData = this.getData.bind(this);
    }

   shouldComponentUpdate(nextProps, nextState) {

        if (this.props.location.search !== nextProps.location.search) {
            this.getData(nextProps.location.search);
        }

        return true;
    }

    componentDidMount() {

        this.getData(this.props.location.search);
    }

    getData(urlParam) {

        const queryRegex = /\?username=(.*)/;

        if (urlParam !== null && urlParam !== undefined && urlParam !== "") {

            const username = queryRegex.exec(urlParam)[1];

            ApiClientService.getUserSearch(username)
                .then((json) => {

                    this.setState({
                        userList: json
                    });
                });
        }
    }

    render() {

        let friendUsernames = this.props.friends.map(friend => friend.username);

        return (

            <div className="viewer user-search-viewer">

                <UserSearchForm {...this.props} />

                <ul className="user-list user-search-results">
                {

                    (this.state.userList !== null && this.state.userList.length > 0)
                        ?

                            <div>
                                <div> Search results: </div>
                            {
                                this.state.userList.map(user => {

                                    let isFriend = friendUsernames.includes(user.username);

                                    return (
                                                <li className="user-tile-wrap">
                                                    <UserSearchTile {...this.props}
                                                        user={user}
                                                        isFriend={isFriend} />
                                                </li>
                                           );
                                })
                            }
                            </div>
                        : "No results"
                }
                </ul>

            </div>

        );
    }
}

export default UserSearchViewer