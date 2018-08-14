import React from "react";
import RecommendationTile from "./recommendation-tile";

class RecommendationsViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.getRecommendations();
    }

    render() {

        return(

            <div className="recommendations-viewer">
                {
                    (this.props.recommendations !== null && this.props.recommendations !== undefined && this.props.recommendations.length > 0)
                        ?
                            this.props.recommendations.map(recommendation => {
                                return <RecommendationTile {...this.props}
                                    recommendation={recommendation} />
                            })
                        : ""
                }
            </div>
        );
    }
}

export default RecommendationsViewer