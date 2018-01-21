import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../Login";
import Dashboard from "../Dashboard";

import "./styles.css";

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/login" component={Login} />

        <Redirect to="/dashboard" />
      </Switch>
    );
  }
}
