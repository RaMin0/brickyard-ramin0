class CreateVehicleStates < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicle_states, primary_key: :code, id: :string do |t|
      t.string :name
    end
  end
end
