import React from "react";

class RecommendationTile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const recommendation = this.props.recommendation;

        return (

            <div className="recommendation-tile">
                <div className="recommended-artist-tile">
                    { recommendation.artist.artistName }
                </div>

                <div>
                    Recommended by { recommendation.recommender.username }
                </div>
            </div>
        );
    }
}

export default RecommendationTile