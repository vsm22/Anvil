import React from "react";

class AddButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <button className="add-button">
                    <i className="fa fa-plus-square"></i>
                </button>
            </div>
        );
    }

}

export default AddButton