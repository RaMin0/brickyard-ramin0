import React, { Component } from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";

export default class extends Component {
  renderNav() {
    return (
      <Link to="/dashboard/new" className="btn btn-primary">
        Add
      </Link>
    );
  }

  render() {
    return (
      <Layout title="Dashboard" nav={this.renderNav()}>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1,001</td>
                <td>Lorem</td>
                <td>ipsum</td>
                <td>dolor</td>
                <td>sit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
