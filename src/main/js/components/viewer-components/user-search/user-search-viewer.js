import React from "react";

class UserSearchViewer extends React.Component {

    constructor() {

        this.handleUserSearchFormSubmit = this.handleUserSearchFormSubmit.bind(this);
    }



    render() {

        return (

            <form name="user-search-form" className="user-search-form" onSubmit={this.handleUserSearchFormSubmit}>
            </form>

        );
    }
}