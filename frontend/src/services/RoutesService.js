import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard, Vehicles, Login } from "../components";

export let LOGIN = "/login";
export let ROOT = "/";
export let VEHICLES = "/vehicles";
export let VEHICLES_NEW = "/vehicles/new";

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route path={ROOT} exact component={Dashboard} />

        <Route path={VEHICLES_NEW} component={Vehicles.New} />
        <Route path={VEHICLES} component={Vehicles} />

        <Route path={LOGIN} component={Login} />

        <Redirect to={ROOT} />
      </Switch>
    );
  }
}
