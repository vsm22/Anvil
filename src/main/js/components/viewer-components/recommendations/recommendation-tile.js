import React from "react";
import { Link } from "react-router-dom";
import ItemToolsNav from "components/widget-components/item-tools-nav";

class RecommendationTile extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        const recommendation = this.props.recommendation;
        const artist = recommendation.artist;

        return (

            <div className="item-card recommendation-tile" ref={this.componentRef}>

                <div className="avatar-wrap">
                    <div className="image-wrap">

                        <Link to={"/artistInfo?artistName=" + artist.artistName} >
                            <img className="image" src={artist["imageLargeUrl"]} />
                        </Link>
                    </div>
                </div>

                <div className="card-content-wrap">
                    <div className="title">
                        <Link to={"/artistInfo?artistName=" + artist.artistName} >
                            { artist.artistName }
                        </Link>
                    </div>

                    <div className="item-tools-nav-wrap">
                        <ItemToolsNav {...this.props} artist={artist} />
                    </div>

                    <div className="recommended-by">
                        Recommended by { recommendation.recommender.username }
                    </div>
                </div>

            </div>
        );
    }
}

export default RecommendationTile