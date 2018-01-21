import React, { Component } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

import "./styles.css";

export default class extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <Main>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">{this.props.title}</h1>
                {this.props.nav}
              </div>

              {this.props.children}
            </Main>
          </div>
        </div>
      </div>
    );
  }
}
