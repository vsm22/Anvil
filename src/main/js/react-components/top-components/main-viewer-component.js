import React from "react";
import {Route, Redirect} from "react-router";
import ApplicationStateTypes from "../../flux/flux-data/application-state-types";
import ArtistSearchResultViewerComponent from "../viewer-components/artist-search-result-viewer-component";
import ArtistInfoViewerComponent from "../viewer-components/artist-info-viewer-component";
import SpinnerComponent from "../viewer-components/spinner-component";
import DevViewerComponent from "../viewer-components/dev-viewer-component";
import BackgroundBarsGraphicComponent from "../../graphics/background-bars-graphic-component";

const MainViewerComponent = (props) => (
    <div className="wrap main-viewer-component-wrap">
      {/* render components based on routes */}
      <Route path="/artistSearch"
        render={ (routeProps) => {
            if (props.applicationState === ApplicationStateTypes.LOADING) {
              console.log("search loading");
              return <SpinnerComponent />
            } else {
              console.log("search ready");
              return <ArtistSearchResultViewerComponent {...Object.assign({}, props, routeProps)} />
            }
          }
        }
      />
      <Route path="/artistInfo"
        render={ (routeProps) => {
            if (props.applicationState === ApplicationStateTypes.LOADING) {
              return <SpinnerComponent />
            } else {
              return <ArtistInfoViewerComponent {...Object.assign({}, props, routeProps)} />
            }
          }
        }
      />
    </div>
);


export default MainViewerComponent