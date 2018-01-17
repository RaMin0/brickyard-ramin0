class CreateAssemblers < ActiveRecord::Migration[5.1]
  def change
    create_table :assemblers do |t|
      t.string  :email,     index: { unique: true }, null: false
      t.boolean :executive, default: false

      t.timestamps
    end
  end
end
