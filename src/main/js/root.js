import React from "react";
import Router from "./router";
import AuthenticationService from "services/authentication-service";
import ApiClientService from "services/api-client-service";

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authentication: {
                username: null,
                jwt: null
            },
            artistCollections: [{}],
            friends: [],
            recommendations: [],
            likedArtists: []
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getCurrentUserAndRenew = this.getCurrentUserAndRenew.bind(this);

        this.getArtistCollections = this.getArtistCollections.bind(this);
        this.setArtistCollections = this.setArtistCollections.bind(this);

        this.getFriends = this.getFriends.bind(this);
        this.setFriends = this.setFriends.bind(this);

        this.getRecommendations = this.getRecommendations.bind(this);
        this.setRecommendations = this.setRecommendations.bind(this);

        this.getLikedArtists = this.getLikedArtists.bind(this);
        this.setLikedArtists = this.setLikedArtists.bind(this);
    }

    componentDidMount() {

        this.getCurrentUserAndRenew();
        this.getLikedArtists();
    }

    /**
     * Get the current user (username and token) and attempt to renew the authentication.
     */
    getCurrentUserAndRenew() {

        return new Promise((resolve, reject) => {

            AuthenticationService.getCurrentUserAndRenew()
                .then(user => {

                    this.setState({
                        authentication: {
                            username: user.username,
                            jwt: user.jwt
                        }
                    });

                    return resolve(user);
                })
                .catch(user => {

                    this.setState({
                        authentication: {
                            username: null,
                            jwt: null
                        }
                    });

                    return reject(user);
                });
        });
    }

    /**
     * Get the current user (username and token).
     * Attempt to get logged-in (registered) user info from localStorage.
     * If unavailable, attempt to get guest user info from sessionStorage.
     * If unavailable, get a guest token from the server and store it in sessionStorage.
     */
    getCurrentUser() {

        return new Promise((resolve, reject) => {

            AuthenticationService.getCurrentUser()
                .then(user => {

                    this.setState({
                        authentication: {
                            username: user.username,
                            jwt: user.jwt
                        }
                    });

                    return resolve(user);
                })
                .catch(user => {

                    this.setState({
                        authentication: {
                            username: null,
                            jwt: null
                        }
                    });

                    return reject(user);
                });
        });
    }

    /**
     * Get artist collections via call to the api service.
     */
    getArtistCollections() {

        ApiClientService.getArtistCollections()
            .then(response => {
                return response.json();
            })
            .then(json => {

                this.setArtistCollections(json);


            }).catch(response => {
            });
    }

    /**
     * Set artist collections in the root component state.
     */
    setArtistCollections(json) {

        this.setState({
            artistCollections: json
        });
    }

    /**
     * Get list of friends from api.
     */
    getFriends() {

        ApiClientService.getFriends()
            .then(json => {
                this.setFriends(json);
            })
            .catch(response => {
            });
    }

    /**
     * Set list of friends.
     */
    setFriends(friends) {

        this.setState({
            friends: friends
        });
    }

    getRecommendations() {

        ApiClientService.getRecommendations()
            .then(recommendations => {

                this.setRecommendations(recommendations);
            })
            .catch(() => {
            });
    }

    setRecommendations(recommendations) {

        this.setState({
            recommendations: recommendations
        });
    }

    getLikedArtists() {

        ApiClientService.getLikedArtists()
            .then(json => {

                this.setState({
                    likedArtists: json
                });
            })
            .catch(() => {
            });
    }

    setLikedArtists(likedArtists) {

        this.setState({
            likedArtists: likedArtists
        });
    }

    render() {

        return (

            <Router {...this.props}

               authentication={this.state.authentication}
               renewAuthentication={this.renewAuthentication}
               getCurrentUser={this.getCurrentUser}

               artistCollections={this.state.artistCollections}
               getArtistCollections={this.getArtistCollections}
               setArtistCollections={this.setArtistCollections}

               friends={this.state.friends}
               getFriends={this.getFriends}
               setFriends={this.setFriends}

               recommendations={this.state.recommendations}
               getRecommendations={this.getRecommendations}
               setRecommendations={this.setRecommendations}

               likedArtists={this.state.likedArtists}
               getLikedArtists={this.getLikedArtists}
               setLikedArtists={this.setLikedArtists} />
        );
    }
}

export default Root