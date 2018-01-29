class Api::V1::VehicleStatesController < Api::V1::BaseController
  before_action -> { authorize! :executive }

  def index
    respond_with VehicleState.all
  end

  def show
    respond_with VehicleState.find(params[:code])
  end

  def create
    respond_with VehicleState.create(vehicle_state_params)
  end

  def update
    respond_with VehicleState.update(params[:code], vehicle_state_params)
  end

  def destroy
    respond_with VehicleState.find(params[:code]).tap(&:destroy)
  end

protected

  def vehicle_state_params
    params.require(:vehicle_state).permit(:name, :code, :position)
  end
end
