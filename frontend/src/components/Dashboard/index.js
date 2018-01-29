import React from "react";

import Layout from "../Layout";
import { AuthenticatedComponent } from "../../services/AuthService";

export default class extends AuthenticatedComponent {
  render() {
    return (
      <Layout title="Dashboard">
        <pre className="alert alert-dark">{JSON.stringify(process.env)}</pre>
      </Layout>
    );
  }
}
