import React from "react";
import ArtistSearchResultTile from "components/viewer-components/artist-search/artist-search-result-tile";
import ApiClientService from "services/api-client-service";

class CollectionViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName: "",
            collectionEntries: [{
                artist: {}
            }]
        }
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

        const queryRegex = /\?username=(.*)&collectionName=(.*)/;

        if (urlParam !== null && urlParam !== undefined && urlParam !== "") {

            const params = queryRegex.exec(urlParam);

            const username = params[1];
            const collectionName = params[2];

            this.setState({ collectionName: collectionName });

            ApiClientService.getArtistCollection(username, collectionName)
                .then((json) => {

                    this.setState({
                        collectionEntries: json
                    });
                });
        }
    }

    render() {

        return (

            <div className="viewer collection-viewer">

                <div className="panel">

                    <h1> { this.state.collectionName } </h1>

                    <ul>

                        {

                            (this.state.collectionEntries !== null && this.state.collectionEntries !== undefined && this.state.collectionEntries.length > 0)
                                ?
                                    this.state.collectionEntries.map(collectionEntry => {

                                        return (

                                            <li className="collection-entry">

                                                <ArtistSearchResultTile {...this.props} artist={collectionEntry.artist} />

                                            </li>
                                        );
                                    })
                                : ""
                        }
                    </ul>

                </div>

            </div>
        );
    }
}

export default CollectionViewer