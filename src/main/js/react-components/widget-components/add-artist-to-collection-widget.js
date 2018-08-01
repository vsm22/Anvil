import React from "react";
import AddArtistToCollectionDialog from "components/widget-components/add-artist-to-collection-dialog";
import AddButton from "components/widget-components/add-button";

class AddArtistToCollectionWidget extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddButtonFocus = this.handleAddButtonFocus.bind(this);
        this.handleAddButtonSubmit = this.handleAddButtonSubmit.bind(this);

        this.componentRef = React.createRef();
    }

    handleAddButtonSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("handleAddButtonSubmit");
        console.log(event.type);

        let dialog = this.componentRef.current.querySelector(".add-artist-to-collection-dialog");

        dialog.classList.remove("hidden");
        dialog.classList.toggle("visible");
    }

    handleAddButtonFocus(event) {

        event.preventDefault();
        event.stopPropagation();

        let label = this.componentRef.current.querySelector(".add-artist-to-collection-label");

        if (event.type === "mouseover" || event.type === "focus") {

            label.classList.remove("hidden");
            label.classList.add("visible");

        } else if (event.type === "mouseout" || event.type === "blur") {

            label.classList.remove("visible");
            label.classList.add("hidden");

        }
    }

    render() {

        let artist = this.props.artist;
        let artistCollections = this.props.artistCollections;

        return (

            <div ref={this.componentRef}>

                <AddButton
                    onSubmit={(event) => this.handleAddButtonSubmit(event)}
                    onMouseOver={this.handleAddButtonFocus}
                    onMouseOut={this.handleAddButtonFocus}
                    onFocus={this.handleAddButtonFocus}
                    onBlur={this.handleAddButtonFocus} />

                <div className="add-artist-to-collection-label hidden">
                    add to collection
                </div>

                <AddArtistToCollectionDialog {...this.props} />

            </div>
        );
    }
}

export default AddArtistToCollectionWidget