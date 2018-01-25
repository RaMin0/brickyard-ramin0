import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { ROOT, VEHICLES } from "../../utils/Routes";

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
      </li>
    ];
  }
}
