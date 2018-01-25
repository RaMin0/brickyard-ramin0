import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Vehicles from "../components/Vehicles";
import Login from "../components/Login";

export let LOGIN = "/login";
export let ROOT = "/";
export let VEHICLES = "/vehicles";

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route path={ROOT} exact component={Dashboard} />
        <Route path={VEHICLES} component={Vehicles} />

        <Route path={LOGIN} component={Login} />

        <Redirect to={ROOT} />
      </Switch>
    );
  }
}
