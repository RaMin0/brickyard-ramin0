import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { ROOT, VEHICLES, VEHICLE_STATES } from "../../services/RoutesService";

export default class extends Component {
  render() {
    return [
      <li key="root" className="nav-item">
        <NavLink to={ROOT} exact className="nav-link">
          Dashboard
        </NavLink>

        <NavLink to={VEHICLES} className="nav-link">
          Vehicles
        </NavLink>

        <NavLink to={VEHICLE_STATES} className="nav-link">
          Vehicle States
        </NavLink>
      </li>
    ];
  }
}
