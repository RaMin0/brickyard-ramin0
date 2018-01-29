class CreateVehicles < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicles do |t|
      t.string :code, index: { unique: true }, null: false

      t.timestamps
    end
  end
end
