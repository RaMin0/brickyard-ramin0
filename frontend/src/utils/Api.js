import axios from "axios";

import { getAccessToken, getAccessEmail } from "./Auth";

function http() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Authorization: `Token token=${getAccessToken()}, email=${getAccessEmail()}`
    }
  });
}

export default {
  postSessions: async (email, password) => {
    return await http().post("sessions", { email, password });
  },

  getVehicles: async () => {
    return await http().get("vehicles");
  }
};
