import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";
import Api from "../../utils/Api";
import { AuthenticatedComponent } from "../../utils/Auth";

export default class extends AuthenticatedComponent {
  constructor() {
    super();

    this.state = { vehicles: [] };
  }

  async componentDidMount() {
    let vehicles = await Api.getVehicles();
    this.setState({ vehicles });
  }

  renderNav() {
    return (
      <Link to="#" className="btn btn-primary">
        Add
      </Link>
    );
  }

  render() {
    return (
      <Layout title="Vehicles" nav={this.renderNav()}>
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
