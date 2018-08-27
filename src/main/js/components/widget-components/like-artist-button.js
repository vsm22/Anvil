import React from "react";
import ApiClientService from "services/api-client-service";

class LikeArtistButton extends React.Component {

    constructor(props) {
        super(props);

        this.isButtonActive = this.isButtonActive.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButtonFocus = this.handleButtonFocus.bind(this);

        this.componentRef = React.createRef();
    }

    handleSubmit(event) {

        event.preventDefault();

        let isButtonActive = this.isButtonActive();

        if (isButtonActive === false) {

            ApiClientService.addLikedArtist(this.props.artist)
                .then(json => {
                    this.props.setLikedArtists(json);
                })
                .catch(response => {
                });

        } else {

            ApiClientService.removeLikedArtist(this.props.artist)
                .then(json => {
                    this.props.setLikedArtists(json);
                })
                .catch(response => {
                });
        }
    }

    handleButtonFocus(event) {

        event.preventDefault();
        event.stopPropagation();

        let label = this.componentRef.current.querySelector(".tool-label");

        if (event.type === "mouseover" || event.type === "focus") {

            label.classList.remove("hidden");
            label.classList.add("visible");

        } else if (event.type === "mouseout" || event.type === "blur") {

            label.classList.remove("visible");
            label.classList.add("hidden");
        }

        return false;
    }

    isButtonActive() {

        let artist = this.props.artist;
        let likedArtistMbids = this.props.likedArtists.map(likedArtist => likedArtist.artistMbid);
        let likedArtistNames = this.props.likedArtists.map(likedArtist => likedArtist.artistName);

        // Check if artist mbid matches a liked artist mbid, or if mbid is empty, check if artist name matches a liked artist name
        if (artist.mbid !== null && artist.mbid !== undefined && artist.mbid !== "") {

            if (likedArtistMbids.includes(artist.mbid) === true) {
                return true;
            }
        } else {

            if (likedArtistNames.includes(artist.artistName) === true) {
                return true;
            }
        }

        return false;
    }

    render() {

        let isButtonActive = this.isButtonActive();

        return (

            <div className="tool-widget like-button" ref={this.componentRef}>

                <form name="like-button-form" className="tool-button-form like-button-form" onSubmit={this.handleSubmit} >
                    <button type="submit" className="submit"
                        onMouseOver={this.handleButtonFocus}
                        onMouseOut={this.handleButtonFocus}
                        onFocus={this.handleButtonFocus}
                        onBlur={this.handleButtonFocus} >

                        {
                            (isButtonActive === true)
                                ? <i className="fas fa-heart red"></i>
                                : <i className="fas fa-heart"></i>
                        }

                    </button>
                </form>

                <div className="tool-label hidden">
                {
                    (isButtonActive === true) ? "Unlike" : "Like"
                }
                </div>

            </div>
        );
    }
}

export default LikeArtistButton