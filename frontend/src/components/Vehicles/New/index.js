import React from "react";
import { Link } from "react-router-dom";

import { AuthenticatedComponent } from "../../../services/AuthService";
import Layout from "../../Layout";
import { VEHICLES } from "../../../services/RoutesService";
import { Vehicles } from "../../../repository/index";
import { mapErrors } from "../../../services/HelpersService";

export default class extends AuthenticatedComponent {
  constructor() {
    super();

    this.state = { vehicle: { name: "", code: "" } };
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      await Vehicles.create(this.state.vehicle);
      this.props.history.push(VEHICLES);
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
                vehicle: { ...this.state.vehicle, [ref]: e.target.value }
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
      <Layout title="Vehicles / Add">
        <form ref="form" onSubmit={e => this.handleSubmit(e)} noValidate>
          {this.renderField("code", "Code", "text", true)}

          <div className="form-group row">
            <div className="offset-md-2 col-sm-10">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
              <Link to={VEHICLES} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}
