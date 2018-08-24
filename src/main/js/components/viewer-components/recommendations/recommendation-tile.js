import React from "react";
import { Link } from "react-router-dom";
import ItemToolsNav from "components/widget-components/item-tools-nav";

class RecommendationTile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recommendation: this.props.recommendation
        }
    }

    render() {

        const recommendation = this.state.recommendation;
        const artist = recommendation.artist;

        return (

            <div className="item-card recommendation-tile" ref={this.componentRef}>

                <div className="title">
                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                        { artist.artistName }
                    </Link>
                </div>

                <div className="image-wrap">

                    <Link to={"/artistInfo?artistName=" + artist.artistName} >
                        <img className="image" src={artist["imageLargeUrl"]} />
                    </Link>
                </div>

                <div className="item-tools-nav-wrap">
                    <ItemToolsNav {...this.props} />
                </div>

                <div className="recommended-by">
                    Recommended by { recommendation.recommender.username }
                </div>

            </div>
        );
    }
}

export default RecommendationTile