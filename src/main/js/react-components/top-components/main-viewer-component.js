import React from "react";
import {Route, Redirect} from "react-router";
import ApplicationStateTypes from "../../flux/flux-data/application-state-types";
import ArtistSearchResultViewerComponent from "../viewer-components/artist-search-result-viewer-component";
import ArtistInfoViewerComponent from "../viewer-components/artist-info-viewer-component";
import SpinnerComponent from "../viewer-components/spinner-component";
import DevViewerComponent from "../viewer-components/dev-viewer-component";

const MainViewerComponent = (props) => (
    <div className="wrap main-viewer-component-wrap">
      {/* render components based on routes */}
      <Route path="/artistSearch"
        render={ (routeProps) => {
            return <ArtistSearchResultViewerComponent {...Object.assign({}, props, routeProps)} />
          }
        }
      />
      <Route path="/artistInfo"
        render={ (routeProps) => {
            return <ArtistInfoViewerComponent {...Object.assign({}, props, routeProps)} />
          }
        }
      />
    </div>
);


export default MainViewerComponent
