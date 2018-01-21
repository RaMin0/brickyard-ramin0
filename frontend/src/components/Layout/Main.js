import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        {this.props.children}
      </main>
    );
  }
}
