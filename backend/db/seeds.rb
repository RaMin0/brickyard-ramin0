# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Assemblers..."
puts "- Executive"
Assembler.executives.find_or_create_by!(email: "executive@brickyard.eu")
puts "- Assembler"
Assembler.find_or_create_by!(email: "assembler@brickyard.eu")

puts "Seeding Vehicle States..."
%w(Designed Assembled Painted Tested).each do |state|
  puts "- #{state}"
  VehicleState.create_with(name: state).find_or_create_by!(code: state.downcase.first)
end

puts "Seeding Vehicles..."
puts "- DEMO"
Vehicle.find_or_create_by!(code: "DEMO")
