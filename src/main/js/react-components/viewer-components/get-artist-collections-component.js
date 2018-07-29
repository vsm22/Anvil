import React from "react";
import ApiClientService from "services/api-client-service";

class GetArtistCollectionsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionList: [{
                collectionName: "",

            }],
            serverMessage: ""
        }
    }

    componentDidMount() {

        ApiClientService.getArtistCollections()
            .catch(response => {

            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    collectionList: json
                });
            });
    }

    render() {

        return (

            <div>
                {
                    this.state.collectionList.map(collection => {
                        return (
                            <div>
                                { collection.collectionName }
                            </div>
                        );
                    })
                }
            </div>

        );
    }
}

export default GetArtistCollectionsComponent