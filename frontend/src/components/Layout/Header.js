import React, { Component } from "react";
import { Link } from "react-router-dom";

import Session from "./Session";

export default class extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          <span className="navbar-toggler-icon d-sm-none mr-3" />
          Brickyard
        </Link>

        <Session />
      </nav>
    );
  }
}
