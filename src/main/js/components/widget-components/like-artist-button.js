import React from "react";
import ApiClientService from "services/api-client-service";

class LikeArtistButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isButtonActive: false
        }

        this.isButtonActive = this.isButtonActive.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButtonFocus = this.handleButtonFocus.bind(this);

        this.componentRef = React.createRef();
    }

    handleSubmit(event) {

        event.preventDefault();

        if (this.state.isButtonActive === false) {

            ApiClientService.addLikedArtist(this.props.artist)
                .then(json => {
                    this.props.setLikedArtists(json);
                    this.isButtonActive();
                })
                .catch(response => {
                });

        } else {

            ApiClientService.removeLikedArtist(this.props.artist)
                .then(json => {
                    this.props.setLikedArtists(json);
                    this.isButtonActive();
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

        let isButtonActive = false;

        let likedArtistMbids = this.props.likedArtists.map(likedArtist => likedArtist.artistMbid);
        let likedArtistNames = this.props.likedArtists.map(likedArtist => likedArtist.artistName);
        let artist = this.props.artist;

        console.log("Liked artists in button: " + this.props.likedArtists);

        if (artist.mbid !== null && artist.mbid !== undefined && artist.mbid !== "") {

            if (likedArtistMbids.includes(artist.mbid) === true) {
                isButtonActive = true;
            }
        } else {

            if (likedArtistNames.includes(artist.artistName) === true) {
                isButtonActive = true;
            }
        }

        this.setState({
            isButtonActive: isButtonActive
        });

        return isButtonActive;
    }

    componentDidMount() {

        this.isButtonActive();
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.state.isButtonActive === nextState.isButtonActive) {
            return false;
        }

        this.isButtonActive();

        return true;
    }

    render() {

        console.log(this.props.likedArtists);

        return (

            <div className="tool-widget like-button" ref={this.componentRef}>

                <form name="like-button-form" className="tool-button-form like-button-form" onSubmit={this.handleSubmit} >
                    <button type="submit" className="submit"
                        onMouseOver={this.handleButtonFocus}
                        onMouseOut={this.handleButtonFocus}
                        onFocus={this.handleButtonFocus}
                        onBlur={this.handleButtonFocus} >

                        {
                            (this.state.isButtonActive === true)
                                ?
                                    <i className="fas fa-heart red"></i>
                                :
                                    <i className="fas fa-heart"></i>

                        }
                    </button>
                </form>

                <div className="tool-label hidden">
                {
                    (this.state.isButtonActive === false) ? "Like" : "Unlike"
                }
                </div>

            </div>
        );
    }
}

export default LikeArtistButton