import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard, Vehicles, VehicleStates, Login } from "../components";

export let LOGIN = "/login";
export let ROOT = "/";
export let VEHICLES = "/vehicles";
export let VEHICLES_NEW = "/vehicles/new";
export let VEHICLE_STATES = "/vehicle_states";
export let VEHICLE_STATES_NEW = "/vehicle_states/new";
export let VEHICLE_STATES_EDIT = "/vehicle_states/:code/edit";

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route path={ROOT} exact component={Dashboard} />

        <Route path={VEHICLES_NEW} component={Vehicles.New} />
        <Route path={VEHICLES} component={Vehicles} />

        <Route path={VEHICLE_STATES_EDIT} component={VehicleStates.Edit} />
        <Route path={VEHICLE_STATES_NEW} component={VehicleStates.New} />
        <Route path={VEHICLE_STATES} component={VehicleStates} />

        <Route path={LOGIN} component={Login} />

        <Redirect to={ROOT} />
      </Switch>
    );
  }
}
