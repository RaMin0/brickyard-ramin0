class AddPositionToVehicleStates < ActiveRecord::Migration[5.1]
  def change
    add_column :vehicle_states, :position, :integer
    assign_position
  end

private

  def assign_position
    VehicleState.find_each.with_index(1) do |vehicle_state, index|
      vehicle_state.update_column(:position, index)
    end
  end
end
