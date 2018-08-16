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

        return (

            <div className="user-search-viewer">

                <UserSearchForm {...this.props} />

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