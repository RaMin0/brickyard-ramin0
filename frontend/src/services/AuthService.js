import { Component } from "react";

import Api from "./ApiService";
import { LOGIN, ROOT } from "./RoutesService";

const ACCESS_TOKEN_KEY = "access_token";
const ACCESS_EMAIL_KEY = "email";

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

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearAccessEmail() {
  localStorage.removeItem(ACCESS_EMAIL_KEY);
}

export async function login(email, password) {
  let response = await Api.postSessions(email, password);

  let { assembler } = response.data;
  setAccessToken(assembler.token);
  setAccessEmail(assembler.email);
}

export function logout() {
  clearAccessToken();
  clearAccessEmail();
}

export function isLoggedIn() {
  return !!getAccessToken() && !!getAccessEmail();
}
