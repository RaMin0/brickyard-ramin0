import axios from "axios";

import { getAccessToken, getAccessEmail } from "./AuthService";

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
  },

  postVehicles: async vehicle => {
    return await http().post("vehicles", vehicle);
  },

  deleteVehicle: async id => {
    return await http().delete(`vehicles/${id}`);
  },

  patchVehicleAdvanceState: async id => {
    return await http().patch(`vehicles/${id}/advance_state`);
  },

  getVehicleStates: async () => {
    return await http().get("vehicle_states");
  },

  getVehicleState: async code => {
    return await http().get(`vehicle_states/${code}`);
  },

  postVehicleStates: async vehicle_state => {
    return await http().post("vehicle_states", vehicle_state);
  },

  patchVehicleState: async (code, vehicle_state) => {
    return await http().patch(`vehicle_states/${code}`, vehicle_state);
  },

  deleteVehicleState: async code => {
    return await http().delete(`vehicle_states/${code}`);
  }
};
