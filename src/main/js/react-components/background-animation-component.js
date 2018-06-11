import React from "react";
import BarsWaveGraphic from "../graphics/bars-wave-graphic";
import ApplicationStateTypes from "../flux/flux-data/application-state-types";

class BackgroundAnimationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initComponent = this.initComponent.bind(this);
        this.state = {
            animationComponents: []
        };
    }

    initComponent(container) {
        this.setState({
            animationComponents: [
                new BarsWaveGraphic(container, {
                    maxOpacity: 0.1,
                    primaryHue: Math.floor(Math.random() * 255),
                    centralAxis: 100
                }),
                new BarsWaveGraphic(container, {
                    maxOpacity: 0.1,
                    primaryHue: Math.floor(Math.random() * 255),
                    centralAxis: 100
                })
            ]
        });
    }

    render() {
        const _this = this;

        let animationComponents = this.state.animationComponents;

        if (this.props.applicationState === ApplicationStateTypes.SEARCH_RESULT) {
            animationComponents.forEach(animationComponent => {
                animationComponent.setAnimationState(2);
            });
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
