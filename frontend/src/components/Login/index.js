import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class extends Component {
  render() {
    return (
      <div className="layout-center">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal">Hello!</h1>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            required
          />
          {/* <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button> */}
          <Link to="/" className="btn btn-lg btn-primary btn-block">
            Login
          </Link>
          <p className="mt-3 mb-3 text-muted">&copy; 2018 Brickyard</p>
        </form>
      </div>
    );
  }
}
