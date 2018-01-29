import { Component } from "react";
import _ from "lodash";

import Api from "./ApiService";
import { LOGIN, ROOT } from "./RoutesService";

const ACCESS_TOKEN_KEY = "access_token";
const ACCESS_EMAIL_KEY = "email";
const EXECUTIVE_KEY = "executive";

const PERMISSIONS = {
  true: "*",
  false: {
    vehicle: ["advance_state"]
  }
};

export class AuthenticatedComponent extends Component {
  componentWillMount() {
    if (!isLoggedIn()) {
      this.props.history.replace(`${LOGIN}?u=${window.location.pathname}`);
    }
  }
}

export class UnauthenticatedComponent extends Component {
  componentWillMount() {
    if (isLoggedIn()) {
      this.props.history.replace(ROOT);
    }
  }
}

export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessEmail(email) {
  localStorage.setItem(ACCESS_EMAIL_KEY, email);
}

export function getAccessEmail() {
  return localStorage.getItem(ACCESS_EMAIL_KEY);
}

export function setExecutive(executive) {
  localStorage.setItem(EXECUTIVE_KEY, executive);
}

export function getExecutive() {
  return localStorage.getItem(EXECUTIVE_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearAccessEmail() {
  localStorage.removeItem(ACCESS_EMAIL_KEY);
}

function clearExecutive() {
  localStorage.removeItem(EXECUTIVE_KEY);
}

export async function login(email, password) {
  let response = await Api.postSessions(email, password);

  let { assembler } = response.data;
  setAccessToken(assembler.token);
  setAccessEmail(assembler.email);
  setExecutive(assembler.executive);
}

export function logout() {
  clearAccessToken();
  clearAccessEmail();
  clearExecutive();
}

export function isLoggedIn() {
  return !!getAccessToken() && !!getAccessEmail();
}

export function can(resource, action = null) {
  let permissions = PERMISSIONS[getExecutive()];
  if (permissions === "*") {
    return true;
  }

  if (permissions[resource]) {
    if (permissions[resource] === "*") {
      return true;
    }

    if (!action) {
      return true;
    }

    if (_.indexOf(permissions[resource], action) >= 0) {
      return true;
    }
  }

  return false;
}

export function cant(resource, action = null) {
  return !can(resource, action);
}
