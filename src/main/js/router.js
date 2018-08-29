import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TopLayout from "./top-layout";

class Router extends React.Component {

    render() {

        return (

            <BrowserRouter>
                <div>
                    <Route path="/" render={(routeProps) => <TopLayout {...Object.assign({}, this.props, routeProps)} /> } />
                </div>
            </BrowserRouter>

        );
    }
}

export default Router