import React from "react";
import ArtistSearchResultTileComponent from "./ArtistSearchResultTileComponent";

class SearchResultViewerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.goToArtistPage = this.goToArtistPage.bind(this);
  }

  goToArtistPage(artistName, event) {
    event.preventDefault();
    this.props.initArtistPageLoad(artistName);
  }

  render() {
    return (
      <div>
        <h1> SearchResultViewerComponent </h1>
        <ul>
          {
            this.props.artistSearchResult.map((artistResultJSON) => {
              let curArtistName = artistResultJSON["name"];
              return (
                <li key={curArtistName} onClick={this.goToArtistPage.bind(this, curArtistName)}>
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

export default SearchResultViewerComponent
