import React from "react";

const ArtistSearchResultTileComponent = (props) => {

    function barExpansionEffect(ev) {
        let barEls = ev.target.parentElement.getElementsByClassName("bar");

        for (let i = 0; i < barEls.length; ++i) {
            if (ev.type === "mouseover") {
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

    return (

        <div className="artist-search-result-tile">

            <div className="artist-name">{props.artist["artistName"]}</div>

            <div className="artist-image-wrap">
                <div className="background-effects">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <img className="artist-image"
                    src={props.artist["imageLargeUrl"]}
                    onMouseOver={(ev) => barExpansionEffect(ev)}
                    onMouseOut={(ev) => barExpansionEffect(ev)}
                />
            </div>
        </div>
    );
}

export default ArtistSearchResultTileComponent