import React from "react";
import { Redirect } from "react-router";
import ArtistSearchService from "../../services/artist-search-service";

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ""
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {

        event.preventDefault();
        event.stopPropagation();

        this.props.history.push("artistSearch?artistName=" + this.state.searchQuery);
    }

    handleChange(event) {

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            searchQuery: document.getElementById("main-search-form-text-input").value
        });
    }

    render() {

        return (

            <form name="mainSearchForm" id="main-search-form" onSubmit={this.handleSubmit}>

                <div id="main-search-widgets-container">

                    <input type="text"
                        name="mainSearchFormTextInput"
                        id="main-search-form-text-input"
                        placeholder="search artist name"
                        onChange={this.handleChange}
                    />

                    <button type="submit" id="main-search-form-submit-button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>

        );
    }
}

export default SearchComponent