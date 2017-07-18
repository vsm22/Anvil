import React from "react";

class ArtistSearchResultTileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.props.artistResultJSON["name"] + ""}</div>
        <img src={this.props.artistResultJSON["imageExtraLargeUrl"]} />
      </div>
    );
  }
}

export default ArtistSearchResultTileComponent
