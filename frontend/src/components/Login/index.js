import React from "react";
import qs from "qs";

import { login, UnauthenticatedComponent } from "../../utils/Auth";
import { humanizeErrors } from "../../utils/Helpers";
import { ROOT } from "../../utils/Routes";

import "./styles.css";

export default class extends UnauthenticatedComponent {
  constructor() {
    super();

    let query = qs.parse(window.location.search.substring(1));

    this.state = {
      email: null,
      password: null,
      error: null,
      u: query.u
    };
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ error: null });

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    try {
      await login(email, password);

      this.props.history.push(this.state.u ? this.state.u : ROOT);
    } catch (ex) {
      let error = humanizeErrors(ex.response.data.errors);
      this.setState({ error });
    }
  }

  render() {
    return (
      <div className="layout-center">
        <form className="form-login" onSubmit={e => this.handleSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Hello!</h1>

          <div className="text-danger mb-2" hidden={!this.state.error}>
            {this.state.error}
          </div>

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            ref="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
            onChange={email => {
              this.setState({ email });
            }}
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            ref="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={password => {
              this.setState({ password });
            }}
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>

          <p className="mt-3 mb-3 text-muted">&copy; 2018 Brickyard</p>
        </form>
      </div>
    );
  }
}
