import React from "react";
import AddArtistToCollectionDialog from "components/widget-components/add-artist-to-collection-dialog";
import ToolButton from "components/widget-components/tool-button";
import ToolDialog from "components/widget-components/tool-dialog";

class ToolWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false
        }

        this.handleAddButtonFocus = this.handleAddButtonFocus.bind(this);
        this.handleAddButtonSubmit = this.handleAddButtonSubmit.bind(this);

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

        this.componentRef = React.createRef();
    }

    handleAddButtonSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("submit fired " + this.state.isDialogOpen);

        if (this.state.isDialogOpen === false) {
            this.openDialog(event);
        } else {
            this.closeDialog(event);
        }

        return false;
    }

    openDialog(event) {

        let dialog = this.componentRef.current.querySelector(".tool-dialog");

        dialog.classList.remove("display-none");
        dialog.classList.add("display-inline-block");
        this.setState({ isDialogOpen: true });

        document.body.addEventListener("click", this.closeDialog);
    }

    closeDialog(event) {

        let dialog = this.componentRef.current.querySelector(".tool-dialog");

        if (event.target !== dialog) {
            console.log("DEBUG: Wrong event fired!");

            dialog.classList.remove("display-inline-block");
            dialog.classList.add("display-none");
            this.setState({ isDialogOpen: false });

            document.body.removeEventListener("click", this.closeDialog)
        }
    }

    handleAddButtonFocus(event) {

        event.preventDefault();
        event.stopPropagation();

        let label = this.componentRef.current.querySelector(".tool-label");

        if (event.type === "mouseover" || event.type === "focus") {

            label.classList.remove("hidden");
            label.classList.add("visible");

        } else if (event.type === "mouseout" || event.type === "blur") {

            label.classList.remove("visible");
            label.classList.add("hidden");

        }

        return false;
    }

    render() {

        let toolLabel = this.props.toolLabel;
        let toolIconClassName = this.props.toolIconClassName;
        let toolDialogComponent = this.props.toolDialogComponent;

        let artist = this.props.artist;
        let artistCollections = this.props.artistCollections;

        return (

            <div ref={this.componentRef} className="tool-widget">

                <ToolButton
                    toolIconClassName={toolIconClassName}
                    onSubmit={this.handleAddButtonSubmit}
                    onMouseOver={this.handleAddButtonFocus}
                    onMouseOut={this.handleAddButtonFocus}
                    onFocus={this.handleAddButtonFocus}
                    onBlur={this.handleAddButtonFocus} />

                <div className="tool-label hidden">
                    { toolLabel }
                </div>

                <ToolDialog {...this.props}
                    toolDialogComponent={toolDialogComponent} />

            </div>
        );
    }
}

export default ToolWidget