class AddAuthToAssemblers < ActiveRecord::Migration[5.1]
  def change
    change_table :assemblers do |t|
      t.string :encrypted_password, null: false
      t.string :token,              null: false
    end

    add_index :assemblers, :token, unique: true
  end
end
