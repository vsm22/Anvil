import React from "react";
import ArticleParserService from "../../services/article-parser-service";
import SimilarArtistsViewerComponent from "./similar-artists-viewer-component";
import ArtistAlbumsViewerComponent from "./artist-albums-viewer-component";
import BackgroundBarsGraphicComponent from "../../graphics/background-bars-graphic-component";

class ArtistInfoViewerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const queryRegex = /\?artistName=(.*)/;
    const urlParam = this.props.location.search;
    const artistName = queryRegex.exec(urlParam)[1].replace("%20", " ");
    this.props.initArtistPageLoad(artistName);
  }

  componentDidMount() {

  }

  render() {
    const props = this.props;
    const artistInfo = props.artistInfo.currentQuery.artistInfo;
    const artistName = artistInfo["name"];
    const artistBioContent = artistInfo["bio"];

    return (
      <div>
        <div className="artist-info-wrap">
          <header>
            <h1> {artistName} </h1>
            <div className="artist-image-wrap">
              <img className="artist-image"
                    src={artistInfo["imageLargeUrl"]}
                    alt={artistName}
              />
            </div>
          </header>
          <section className="similar-artists">
            <SimilarArtistsViewerComponent {...props} />
          </section>
          <section className="artist-albums">
            <ArtistAlbumsViewerComponent {...props} />
          </section>
          <section className="artist-bio">
              <h1> Bio </h1>
              { ArticleParserService.parseArticleStringToJSX(artistBioContent, "\n") }
          </section>
        </div>

      </div>
    );
  }
}

export default ArtistInfoViewerComponent
