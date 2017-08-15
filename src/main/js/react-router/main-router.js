import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {Redirect, browserHistory} from "react-router";
import RootComponent from "../react-components/root-component";
import ApplicationStateTypes from "../flux/flux-data/application-state-types";

function MainRouter(props) {
  return (
      <BrowserRouter>
          <Route path="/" render={() => <RootComponent {...props} />} />
      </BrowserRouter>
  );
}

export default MainRouter
