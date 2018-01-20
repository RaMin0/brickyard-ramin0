class Api::V1::VehiclesController < Api::V1::BaseController
  def index
    respond_with Vehicle.includes(:state)
  end

  def create
    respond_with Vehicle.create(vehicle_params)
  end

  def destroy
    respond_with Vehicle.destroy(params[:id])
  end

  def advance_state
    @vehicle = Vehicle.find(params[:id])

    if @vehicle.advance_state!
      head :no_content
    else
      head :unprocessable_entity
    end
  end

protected

  def vehicle_params
    params.require(:vehicle).permit(:code)
  end
end
