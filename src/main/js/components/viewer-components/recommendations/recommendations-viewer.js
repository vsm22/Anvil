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

            <div className="viewer recommendations-viewer">

                <h1> Recommendations </h1>

                <ul className="recommendations-list">
                {
                    (this.props.recommendations !== null && this.props.recommendations !== undefined && this.props.recommendations.length > 0)
                        ?
                                this.props.recommendations.map(recommendation => {

                                    return (

                                       <li className="item-card-wrap">
                                            <RecommendationTile {...this.props}
                                                recommendation={recommendation} />
                                       </li>

                                    );
                                })
                        : ""
                }
                </ul>

            </div>
        );
    }
}

export default RecommendationsViewer