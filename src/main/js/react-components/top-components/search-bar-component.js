import React from "react";
import { Redirect } from "react-router";
import DispatcherActions from "../../flux/flux-dispatcher/dispatcher-actions";
import ArtistSearchService from "../../services/artist-search-service";

const SearchComponent = (props) => (

    <form name="mainSearchForm"
        id="main-search-form"
        onSubmit={(event) => {
            event.preventDefault();
            props.redirectLocation("/artistSearch?artistName=" + props.searchQuery);
        }
        }
    >
        <div id="main-search-widgets-container">
            <input type="text"
                name="mainSearchFormTextInput"
                id="main-search-form-text-input"
                placeholder="search artist name"
                onChange={(event) => {
                    event.preventDefault();
                    props.setSearchQuery(event.target.value);
                }
                }
            />
            <button type="submit"
                id="main-search-form-submit-button"
            >
                <i className="fa fa-search"></i>
            </button>
        </div>
    </form>
);

export default SearchComponent
