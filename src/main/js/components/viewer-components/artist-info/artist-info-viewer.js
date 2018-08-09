import React from "react";
import ArticleParserService from "services/article-parser-service";
import SimilarArtistsViewer from "components/viewer-components/similar-artists/similar-artists-viewer";
import ArtistAlbumsViewer from "components/viewer-components/artist-albums/artist-albums-viewer";
import ApiClientService from "services/api-client-service";

class ArtistInfoViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            artistInfo: {
                artistName: "",
                imageSmallUrl: "",
                imageMediumUrl: "",
                imageLargeUrl: "",
                bioContent: ""
            }
        }

        this.getData = this.getData.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.location.search !== nextProps.location.search) {
            this.getData(nextProps.location.search);
        }

        return true;
    }


    componentDidMount() {
        this.getData(this.props.location.search);
    }

    getData(urlParam) {

        const queryRegex = /\?artistName=(.*)/;

        if (urlParam !== null && urlParam !== undefined && urlParam !== "") {

            const artistName = queryRegex.exec(urlParam)[1].replace("%20", " ");

            ApiClientService.getArtistInfo(artistName)
                .then((json) => {

                    this.setState({
                        artistInfo: json
                    });
                });
        }
    }

    render() {

        let artistInfo = this.state.artistInfo;
        let similarArtists = this.state.similarArtists;

        return (

            <div className="artist-info-wrap">

                <header>
                    <h1> {artistInfo.artistName} </h1>
                    <div className="artist-image-wrap">
                        <img className="artist-image"
                            src={artistInfo.imageLargeUrl}
                            alt={artistInfo.artistName}
                        />
                    </div>
                </header>

                <section className="similar-artists">
                    <SimilarArtistsViewer {...this.props}/>
                </section>

                <section className="artist-albums">
                    <ArtistAlbumsViewer {...this.props} />
                </section>

                <section className="artist-bio">
                    <h1> Bio </h1>
                    {ArticleParserService.parseArticleStringToJSX(artistInfo["bioContent"], "\n")}
                </section>
            </div>
        );
    }
}

export default ArtistInfoViewer