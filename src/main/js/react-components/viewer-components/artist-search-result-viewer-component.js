import React from "react";
import ArtistSearchResultTileComponent from "../tile-components/artist-search-result-tile-component";

class ArtistSearchResultViewerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const queryRegex = /\?artistName=(.*)/;
    const urlParam = this.props.location.search;
    const artistName = queryRegex.exec(urlParam)[1];
    this.props.initArtistSearch(artistName);
  }

  render() {
    const props = this.props;

    return (
      <div id="artist-search-result-container">
        <h1> artists matching {props.artistSearchResult.currentQuery.artistName} </h1>
        <ul>
          {
            props.artistSearchResult.currentQuery.artistList.map((artistResultJSON) => {
              let curArtistName = artistResultJSON["name"];

              return (
                <li key={curArtistName}
                  onClick={(event) => {
                    event.preventDefault();
                    props.redirectLocation("/artistInfo?artistName=" + curArtistName);
                  }
                }>
                  <ArtistSearchResultTileComponent artistResultJSON={artistResultJSON} />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default ArtistSearchResultViewerComponent
