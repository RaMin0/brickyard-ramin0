# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Assemblers..."
puts "- Executive"
Assembler.executives.create!(email: "executive@brickyard.eu")
puts "- Assembler"
Assembler.create!(email: "assembler@brickyard.eu")

puts "Seeding Vehicles..."
puts "- DEMO"
Vehicle.create!(code: "DEMO")
