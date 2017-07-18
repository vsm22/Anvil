import React from "react";

class ArtistInfoViewerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let artistInfo = this.props.artistInfo[0];

    return (
      <div>
      {
        (artistInfo) ?
          <div>
            <header>
              <h1> {artistInfo["name"]} </h1>
              <div>
                <img src={artistInfo["imageExtraLargeUrl"]} />
              </div>
            </header>
            <section>
              <article>
                {artistInfo["bio"]["content"]}
              </article>
            </section>
          </div>
        :
        ""
      }
      </div>
    );
  }
}

export default ArtistInfoViewerComponent
