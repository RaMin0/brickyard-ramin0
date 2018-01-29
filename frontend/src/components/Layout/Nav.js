import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { ROOT, VEHICLES, VEHICLE_STATES } from "../../services/RoutesService";
import { cant } from "../../services/AuthService";

export default class extends Component {
  render() {
    return [
      <li key="root" className="nav-item">
        <NavLink to={ROOT} exact className="nav-link">
          Dashboard
        </NavLink>

        <NavLink to={VEHICLES} className="nav-link" hidden={cant("vehicle")}>
          Vehicles
        </NavLink>

        <NavLink
          to={VEHICLE_STATES}
          className="nav-link"
          hidden={cant("vehicle_state")}
        >
          Vehicle States
        </NavLink>
      </li>
    ];
  }
}
