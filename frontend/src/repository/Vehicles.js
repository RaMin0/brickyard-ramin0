import ApiService from "../services/ApiService";

export function all() {
  return ApiService.getVehicles();
}

export function create(vehicle) {
  return ApiService.postVehicles(vehicle);
}

export function destroy(vehicle) {
  return ApiService.deleteVehicle(vehicle.id);
}

export function advanceState(vehicle) {
  return ApiService.patchVehicleAdvanceState(vehicle.id);
}
