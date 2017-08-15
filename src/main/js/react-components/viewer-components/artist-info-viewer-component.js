import React from "react";
import ArticleParserService from "../../services/article-parser-service";
import SimilarArtistsViewerComponent from "./similar-artists-viewer-component";

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
          <section className="artist-bio">
              { ArticleParserService.parseArticleStringToJSX(artistBioContent, "\n") }
          </section>
        </div>
        <SimilarArtistsViewerComponent {...props} />
      </div>
    );
  }
}

export default ArtistInfoViewerComponent
