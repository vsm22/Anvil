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

        this.handleButtonFocus = this.handleButtonFocus.bind(this);
        this.handleButtonSubmit = this.handleButtonSubmit.bind(this);

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.closeDialogOnOutsideClick = this.closeDialogOnOutsideClick.bind(this);

        this.componentRef = React.createRef();
    }

    handleButtonFocus(event) {

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

    handleButtonSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        if (this.state.isDialogOpen === false) {
            this.openDialog(event);
        } else {
            this.closeDialog(event);
        }

        return false;
    }

    openDialog(event) {

        const dialog = this.componentRef.current.querySelector(".tool-dialog");

        this.setState({ isDialogOpen: true });

        document.body.addEventListener("click", this.closeDialogOnOutsideClick);
    }

    closeDialogOnOutsideClick(event) {

        const dialog = this.componentRef.current.querySelector(".tool-dialog");

        if (!dialog.contains(event.target)) {
            this.closeDialog();
        }
    }

    closeDialog(event) {

        const dialog = this.componentRef.current.querySelector(".tool-dialog");

        this.setState({ isDialogOpen: false });

        document.body.removeEventListener("click", this.closeDialogOnOutsideClick)
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
                    onSubmit={this.handleButtonSubmit}
                    onMouseOver={this.handleButtonFocus}
                    onMouseOut={this.handleButtonFocus}
                    onFocus={this.handleButtonFocus}
                    onBlur={this.handleButtonFocus} />

                <div className="tool-label hidden">
                    { toolLabel }
                </div>

                <div>
                {
                    (this.state.isDialogOpen)
                        ? <ToolDialog {...this.props}
                            toolDialogComponent={toolDialogComponent}
                            openDialog={this.openDialog}
                            closeDialog={this.closeDialog} />
                        : ""
                }
                </div>

            </div>
        );
    }
}

export default ToolWidget