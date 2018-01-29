import React from "react";
import qs from "qs";

import { login, UnauthenticatedComponent } from "../../services/AuthService";
import { humanizeErrors } from "../../services/HelpersService";
import { ROOT } from "../../services/RoutesService";

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

  componentDidMount() {
    document.title = "Brickyard";
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ error: null });

    try {
      let { email, password } = this.state;
      await login(email, password);

      this.props.history.push(this.state.u ? this.state.u : ROOT);
    } catch (ex) {
      let error = humanizeErrors(ex.response.data.errors);
      this.setState({ error });
    }
  }

  renderField(ref, label, type, autoFocus = false) {
    return (
      <div>
        <label htmlFor={ref} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          ref={ref}
          className="form-control"
          placeholder={label}
          required
          autoFocus={autoFocus}
          onChange={e => {
            this.setState({
              [ref]: e.target.value
            });
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="layout-center">
        <form className="form-login" onSubmit={e => this.handleSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Hello!</h1>

          <div className="text-danger mb-2" hidden={!this.state.error}>
            {this.state.error}
          </div>

          {this.renderField("email", "Email", "email", true)}
          {this.renderField("password", "Password", "password")}

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>

          <p className="mt-3 mb-3 text-muted">&copy; 2018 Brickyard</p>
        </form>
      </div>
    );
  }
}
