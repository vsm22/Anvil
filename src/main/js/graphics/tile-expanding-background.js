import React from "react";

class TileExpandingBackground extends React.Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
    }

    animate(event) {

        console.log("animate event " + event);

        if (event.type === "mouseover" || event.type === "mouseout") {

            let barEls = event.target.parentElement.getElementsByClassName("bar");

            console.log(barEls);

            for (let i = 0; i < barEls.length; ++i) {
                if (event.type === "mouseover") {
                    let newWidth = Math.floor(Math.random() * 500) + 320;
                    let newLightness = Math.floor(Math.random() * 100);
                    let newColor = "hsl(210, 100%, " + newLightness + "%)";

                    barEls[i].style.transition = "width 0.3s";
                    barEls[i].style.backgroundColor = newColor;
                    barEls[i].style.width = newWidth + "px";
                } else {
                    barEls[i].style.width = "0px";
                }
            }
        }
    }

    render() {

        this.animate(this.props.event);

        return (

            <div className="background-effects">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

        );
    }
}

export default TileExpandingBackground