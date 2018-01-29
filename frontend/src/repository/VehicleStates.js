import ApiService from "../services/ApiService";

export function all() {
  return ApiService.getVehicleStates();
}

export function find(code) {
  return ApiService.getVehicleState(code);
}

export function create(vehicleState) {
  return ApiService.postVehicleStates(vehicleState);
}

export function update(vehicleState, data) {
  return ApiService.patchVehicleState(vehicleState.code, data);
}

export function destroy(vehicleState) {
  return ApiService.deleteVehicleState(vehicleState.code);
}
