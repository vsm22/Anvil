import React from "react";

class AddButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let onSubmit = this.props.onSubmit;
        let onMouseOver = this.props.onMouseOver;
        let onMouseOut = this.props.onMouseOut;
        let onFocus = this.props.onFocus;
        let onBlur = this.props.onBlur;

        return (

            <form name="add-button-form" onSubmit={onSubmit}>
                <button type="submit" className="add-button"
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onFocus={onFocus}
                    onBlur={onBlur} >
                    <i className="fa fa-plus-square"></i>
                </button>
            </form>
        );
    }

}

export default AddButton