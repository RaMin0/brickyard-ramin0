import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class extends Component {
  render() {
    return [
      <li key="dashboard" className="nav-item">
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
      </li>
    ];
  }
}
