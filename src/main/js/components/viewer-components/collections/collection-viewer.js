import React from "react";
import { Link } from "react-router-dom";
import CollectionEntryTile from "./collection-entry-tile";
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

        this.getData = this.getData.bind(this);
        this.setCollectionData = this.setCollectionData.bind(this);
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

        const queryRegex = /\?collectionName=(.*)/;

        if (urlParam !== null && urlParam !== undefined && urlParam !== "") {

            const params = queryRegex.exec(urlParam);

            const collectionName = params[1];

            this.setState({ collectionName: collectionName });

            ApiClientService.getArtistCollection(collectionName)
                .then((json) => {

                    this.setState({
                        collectionEntries: json
                    });
                });
        }
    }

    setCollectionData(data) {

        this.setState({
            collectionEntries: data
        });
    }

    render() {

        return (

            <div className="viewer collection-viewer">

                <div className="panel">

                    <Link to="/collections">
                        <span>
                            <i className="fas fa-arrow-left"></i>
                        </span>
                        <span>
                            Return to collections
                        </span>
                    </Link>

                    <h1> { this.state.collectionName } collection </h1>

                    <ul>

                        {

                            (this.state.collectionEntries !== null && this.state.collectionEntries !== undefined && this.state.collectionEntries.length > 0)
                                ?
                                    this.state.collectionEntries.map(collectionEntry => {

                                        return (

                                            <li className="collection-entry">

                                                <CollectionEntryTile {...this.props}
                                                    artist={collectionEntry.artist}
                                                    collectionName={this.state.collectionName}
                                                    setCollectionData={this.setCollectionData} />

                                            </li>
                                        );
                                    })
                                : "Collection is empty"
                        }
                    </ul>

                </div>

            </div>
        );
    }
}

export default CollectionViewer