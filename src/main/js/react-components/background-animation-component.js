import React from "react";
import BarsWaveGraphic from "../graphics/bars-wave-graphic";
import ApplicationStateTypes from "../flux/flux-data/application-state-types";

class BackgroundAnimationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.initComponent = this.initComponent.bind(this);
    this.state = {
      barsWaveGraphic1: {},
      barsWaveGraphic2: {}
    };
  }

  initComponent(el) {
    this.setState({
      barsWaveGraphic1: new BarsWaveGraphic(el, {
          maxOpacity: 0.1,
          primaryHue: Math.floor(Math.random() * 255),
          centralAxis: 100
      }),
      barsWaveGraphic2: new BarsWaveGraphic(el, {
          maxOpacity: 0.1,
          primaryHue: Math.floor(Math.random() * 255),
          centralAxis: 100
      })
    });
  }

  render() {
    const _this = this;

    if (this.props.applicationState === ApplicationStateTypes.SEARCH_RESULT) {
       _this.state.barsWaveGraphic1.lineUpHorizontally();
       _this.state.barsWaveGraphic2.lineUpHorizontally();
    }

    return (
      <svg ref={this.initComponent}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1000
        }}>
      </svg>
    );
  }
}

export default BackgroundAnimationComponent;
