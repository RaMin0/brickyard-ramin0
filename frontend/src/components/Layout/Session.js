import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { logout, getAccessEmail } from "../../services/AuthService";
import { LOGIN } from "../../services/RoutesService";

class Session extends Component {
  handleLogout(e) {
    e.preventDefault();

    logout();
    this.props.history.push(LOGIN);
  }

  render() {
    let email = getAccessEmail();

    return (
      <div>
        <span className="navbar-text pl-3">Logged in as {email}</span>
        <Link
          className="navbar-text px-3"
          to={LOGIN}
          onClick={e => this.handleLogout(e)}
        >
          Logout
        </Link>
      </div>
    );
  }
}

export default withRouter(Session);
