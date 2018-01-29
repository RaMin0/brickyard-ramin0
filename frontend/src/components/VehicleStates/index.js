import React from "react";
import { Link } from "react-router-dom";
import tableDragger from "table-dragger";
import _ from "lodash";

import { AuthenticatedComponent } from "../../services/AuthService";
import Layout from "../Layout";
import { VehicleStates } from "../../repository";
import {
  VEHICLE_STATES_NEW,
  VEHICLE_STATES_EDIT
} from "../../services/RoutesService";

import New from "./New";
import Edit from "./Edit";
import { humanizeErrors, arrayMove } from "../../services/HelpersService";

export default class extends AuthenticatedComponent {
  static New = New;
  static Edit = Edit;

  constructor() {
    super();

    this.state = { vehicleStates: [] };
  }

  async componentDidMount() {
    let response = await VehicleStates.all();
    this.setState({ vehicleStates: response.data });

    tableDragger(this.refs.table, {
      mode: "row",
      onlyBody: true,
      dragHandler: "tr"
    }).on("drop", this.orderVehicleState.bind(this));
  }

  orderVehicleState(startPosition, endPosition) {
    let [startIndex, endIndex] = [startPosition - 1, endPosition - 1];
    let vehicleState = { ...this.state.vehicleStates[startIndex] };
    this.setState({
      vehicleStates: arrayMove(this.state.vehicleStates, startIndex, endIndex)
    });
    VehicleStates.update(vehicleState, { position: endPosition });
  }

  deleteVehicleStates(vehicleState) {
    let vehicleStates = this.state.vehicleStates;
    let i = _.findIndex(vehicleStates, s => s.code === vehicleState.code);
    vehicleStates.splice(i, 1);
    this.setState({ vehicleStates });
  }

  async handleDelete(e, vehicleState) {
    e.preventDefault();

    try {
      await VehicleStates.destroy(vehicleState);
      this.deleteVehicle(vehicleState);
    } catch (e) {
      alert(humanizeErrors(e.response.data.errors));
    }
  }

  renderNav() {
    return (
      <Link to={VEHICLE_STATES_NEW} className="btn btn-primary">
        Add
      </Link>
    );
  }

  renderVehicleStates() {
    return _.map(this.state.vehicleStates, s => (
      <tr key={s.code}>
        <td>{s.name}</td>
        <td>
          <code>{s.code}</code>
        </td>
        <td>
          <Link
            className="btn btn-sm btn-secondary mr-1"
            to={VEHICLE_STATES_EDIT.replace(":code", s.code)}
          >
            Edit
          </Link>
          <a
            className="btn btn-sm btn-danger"
            href="/"
            data-toggle="modal"
            data-target={`#modal-delete-${s.code}`}
          >
            Delete
          </a>
          <div
            className="modal fade"
            id={`modal-delete-${s.code}`}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Danger!</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete <code>{s.code}</code>?
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
                    onClick={e => this.handleDelete(e, s)}
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
      <Layout title="Vehicle States" nav={this.renderNav()}>
        <div className="table-responsive">
          <div className="alert alert-primary">
            <strong>PS:</strong> Drag and drop rows to reorder vehicle states.
          </div>

          <table ref="table" className="table table-striped table-sm">
            <thead>
              <tr>
                <th className="w-50">Name</th>
                <th className="w-25">Code</th>
                <th className="w-25" />
              </tr>
            </thead>
            <tbody>{this.renderVehicleStates()}</tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
