# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180118094318) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assemblers", force: :cascade do |t|
    t.string "email", null: false
    t.boolean "executive", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_assemblers_on_email", unique: true
  end

  create_table "vehicle_states", primary_key: "code", id: :string, force: :cascade do |t|
    t.string "name"
    t.integer "position"
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state_code"
    t.index ["code"], name: "index_vehicles_on_code", unique: true
  end

  add_foreign_key "vehicles", "vehicle_states", column: "state_code", primary_key: "code", on_update: :cascade, on_delete: :restrict
end
