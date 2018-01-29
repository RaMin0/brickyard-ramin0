import Api from "../services/ApiService";

export function all() {
  return Api.getVehicles();
}
