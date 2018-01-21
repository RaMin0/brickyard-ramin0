import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <div>
        <span className="navbar-text pl-3">
          Logged in as executive@brickyard.eu
        </span>
        <Link className="navbar-text px-3" to="/login">
          Logout
        </Link>
      </div>
    );
  }
}
