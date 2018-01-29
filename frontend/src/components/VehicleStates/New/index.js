import React from "react";
import { Link } from "react-router-dom";

import { AuthenticatedComponent } from "../../../services/AuthService";
import Layout from "../../Layout";
import { VEHICLE_STATES } from "../../../services/RoutesService";
import { VehicleStates } from "../../../repository/index";
import { mapErrors } from "../../../services/HelpersService";

export default class extends AuthenticatedComponent {
  constructor() {
    super();

    this.state = { vehicleState: { name: "", code: "" } };
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      await VehicleStates.create(this.state.vehicleState);
      this.props.history.push(VEHICLE_STATES);
    } catch (e) {
      mapErrors(this.refs, e.response.data.errors);
    }
  }

  renderField(ref, label, type, autoFocus = false) {
    return (
      <div className="form-group row">
        <label htmlFor={ref} className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <input
            type={type}
            className="form-control"
            id={ref}
            placeholder={label}
            ref={ref}
            autoFocus={autoFocus}
            onChange={e => {
              this.setState({
                vehicleState: {
                  ...this.state.vehicleState,
                  [ref]: e.target.value
                }
              });
            }}
          />
          <div className="invalid-feedback" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Layout title="Vehicle State / Add">
        <form ref="form" onSubmit={e => this.handleSubmit(e)} noValidate>
          {this.renderField("name", "Name", "text", true)}
          {this.renderField("code", "Code", "text")}

          <div className="form-group row">
            <div className="offset-md-2 col-sm-10">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
              <Link to={VEHICLE_STATES} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}
