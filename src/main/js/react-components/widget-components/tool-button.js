import React from "react";

class ToolButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let toolIconClassName = this.props.toolIconClassName;

        let onSubmit = this.props.onSubmit;
        let onMouseOver = this.props.onMouseOver;
        let onMouseOut = this.props.onMouseOut;
        let onFocus = this.props.onFocus;
        let onBlur = this.props.onBlur;

        return (

            <form name="tool-button-form" className="tool-button-form" onSubmit={onSubmit}>
                <button type="submit" className="tool-button"
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onFocus={onFocus}
                    onBlur={onBlur} >
                        <i className={toolIconClassName}></i>
                </button>
            </form>
        );
    }
}

export default ToolButton