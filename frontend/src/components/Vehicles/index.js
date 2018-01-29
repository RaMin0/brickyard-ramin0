import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { AuthenticatedComponent, cant } from "../../services/AuthService";
import Layout from "../Layout";
import { Vehicles } from "../../repository";
import { VEHICLES_NEW } from "../../services/RoutesService";

import New from "./New";

export default class extends AuthenticatedComponent {
  static New = New;

  constructor() {
    super();

    this.state = { vehicles: [] };
  }

  async componentDidMount() {
    let response = await Vehicles.all();
    this.setState({ vehicles: response.data });
  }

  updateVehicle(vehicle, data) {
    let vehicles = this.state.vehicles;
    let i = _.findIndex(vehicles, v => v.id === vehicle.id);
    Object.assign(vehicles[i], data);
    this.setState({ vehicles });
  }

  deleteVehicle(vehicle) {
    let vehicles = this.state.vehicles;
    let i = _.findIndex(vehicles, v => v.id === vehicle.id);
    vehicles.splice(i, 1);
    this.setState({ vehicles });
  }

  async handleNextState(e, vehicle) {
    e.preventDefault();

    let response = await Vehicles.advanceState(vehicle);
    this.updateVehicle(vehicle, response.data);
  }

  async handleDelete(e, vehicle) {
    e.preventDefault();

    await Vehicles.destroy(vehicle);
    this.deleteVehicle(vehicle);
  }

  renderNav() {
    return (
      <Link
        to={VEHICLES_NEW}
        className="btn btn-primary"
        hidden={cant("vehicle", "create")}
      >
        Add
      </Link>
    );
  }

  renderState(state) {
    if (state) {
      return state.name;
    }

    return "N/A";
  }

  renderVehicles() {
    return _.map(this.state.vehicles, v => (
      <tr key={v.id}>
        <td>
          <code>{v.code}</code>
        </td>
        <td>{this.renderState(v.state)}</td>
        <td>{this.renderState(v.next_state)}</td>
        <td>
          <a
            className="btn btn-sm btn-warning mr-1"
            href="/"
            hidden={cant("vehicle", "advance_state") || !v.next_state}
            onClick={e => this.handleNextState(e, v)}
          >
            Next State &rarr;
          </a>
          <a
            className="btn btn-sm btn-danger"
            href="/"
            data-toggle="modal"
            data-target={`#modal-delete-${v.id}`}
            hidden={cant("vehicle", "destroy")}
          >
            Delete
          </a>
          <div className="modal fade" id={`modal-delete-${v.id}`} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Danger!</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete <code>{v.code}</code>?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-link text-muted"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={e => this.handleDelete(e, v)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <Layout title="Vehicles" nav={this.renderNav()}>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th className="w-25">Code</th>
                <th className="w-25">State</th>
                <th className="w-25">Next State</th>
                <th className="w-25" />
              </tr>
            </thead>
            <tbody>{this.renderVehicles()}</tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
