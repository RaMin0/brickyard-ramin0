class AddStateCodeToVehicles < ActiveRecord::Migration[5.1]
  def change
    add_column :vehicles, :state_code, :string
    add_foreign_key :vehicles, :vehicle_states,
      column: :state_code, primary_key: :code,
      on_update: :cascade, on_delete: :restrict
  end
end
