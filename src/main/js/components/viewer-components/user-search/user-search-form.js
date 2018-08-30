import React from "react";
import UserSearchTile from "./user-search-tile";
import ApiClientService from "services/api-client-service";

class UserSearchForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            query: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.componentRef = React.createRef();
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        const form = this.componentRef.current;

        this.setState({
            query: form.elements["user-search-query"].value
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        this.props.history.push("friends?username=" + this.state.query);
    }

    render() {

        return (

            <form name="user-search-form" className="user-search-form panel-form" onSubmit={this.handleSubmit} ref={this.componentRef}>

                <input type="text" name="user-search-query" className="user-search-query" placeholder="Search for users" onChange={this.handleChange} />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>

            </form>
        );
    }
}

export default UserSearchForm