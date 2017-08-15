import React from "react";
import SimilarArtistTileComponent from "../tile-components/similar-artist-tile-component";

class SimilarArtistsViewerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    let similarArtists = props.similarArtists;

    return (
      <div>
        <h1> Similar Artists </h1>
        {
          similarArtists.map(artist => {
            let curArtistName = artist["name"];

            return (
              <li key={curArtistName}
                  onClick={ (event) => {
                      event.preventDefault();
                      props.redirectLocation("/artistInfo?artistName=" + curArtistName);
                    }
                  }
              >
                <SimilarArtistTileComponent artist={artist} />
              </li>
            );
          })
        }
      </div>
    );
  }
}

export default SimilarArtistsViewerComponent
