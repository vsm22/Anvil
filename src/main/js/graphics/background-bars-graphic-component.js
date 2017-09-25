import React from "react";
import BackgroundBarsGraphic from "./background-bars-graphic";

class BackgroundBarsGraphicComponent extends React.Component {
  constructor(props) {
    super(props);

    this.graphicsOptions = props.graphicsOptions || {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -100
        }}
      >
      </div>
    );
  }
}

export default BackgroundBarsGraphicComponent
