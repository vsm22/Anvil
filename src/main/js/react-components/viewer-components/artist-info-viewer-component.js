import React from "react";
import ArticleParserService from "../../services/article-parser-service";
import SimilarArtistsViewerComponent from "./similar-artists-viewer-component";
import ArtistAlbumsViewerComponent from "./artist-albums-viewer-component";
import BackgroundBarsGraphicComponent from "../../graphics/background-bars-graphic-component";
import ApiClientService from "services/api-client-service";

class ArtistInfoViewerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            artistInfo: {
                artistName: "",
                imageSmallUrl: "",
                imageMediumUrl: "",
                imageLargeUrl: "",
                bioContent: ""
            },

            similarArtists: {
                artistList: [{
                    artistName: "",
                    imageSmallUrl: "",
                    imageMediumUrl: "",
                    imageLargeUrl: ""
                }]
            },

            artistAlbums: {
                albumList: [{

                }]
            }
        }
    }

    componentDidMount() {

        const _this = this;

        const queryRegex = /\?artistName=(.*)/;
        const urlParam = this.props.location.search;
        const artistName = queryRegex.exec(urlParam)[1].replace("%20", " ");

        ApiClientService.getArtistInfo(artistName)
            .then((json) => {
                _this.setState({
                    artistInfo: json
                });
            });

        ApiClientService.getSimilarArtists(artistName)
            .then((json) => {

                console.log("Similar artists json before setstate: " + json);

                _this.setState({
                    similarArtists: json
                });

                console.log("Similar artists json after setstate: " + this.state.similarArtists);
            });

        ApiClientService.getArtistAlbums(artistName)
            .then((json) => {

                _this.setState({
                    artistAlbums: json
                })

            })
    }

    render() {

        let artistInfo = this.state.artistInfo;
        let similarArtists = this.state.similarArtists;

        return (

            <div className="artist-info-wrap">

                <header>
                    <h1> {artistInfo["name"]} </h1>
                    <div className="artist-image-wrap">
                        <img className="artist-image"
                            src={artistInfo["imageLargeUrl"]}
                            alt={artistInfo["name"]}
                        />
                    </div>
                </header>

                <section className="similar-artists">
                    <SimilarArtistsViewerComponent similarArtists={similarArtists}/>
                </section>

                <section className="artist-albums">
                    <ArtistAlbumsViewerComponent {...this.props} />
                </section>

                <section className="artist-bio">
                    <h1> Bio </h1>
                    {ArticleParserService.parseArticleStringToJSX(artistInfo["bioContent"], "\n")}
                </section>
            </div>
        );
    }
}

export default ArtistInfoViewerComponent
