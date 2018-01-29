import React, { Component } from "react";

import Nav from "./Nav";

export default class extends Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <Nav />
          </ul>
        </div>
      </nav>
    );
  }
}
