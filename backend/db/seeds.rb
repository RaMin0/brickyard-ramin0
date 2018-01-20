# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Assemblers..."
[
  ["Executive", "executive", { password: "topsecret", executive: true }],
  ["Assembler", "assembler", { password: "secret" }]
].each do |(name, username, attrs)|
  puts "- #{name}"
  Assembler.create_with(attrs).find_or_create_by!(email: "#{username}@brickyard.eu").tap do |a|
    puts "  * Email:    #{a.email}"
    puts "  * Password: #{attrs[:password]}"
  end
end

puts "Seeding Vehicle States..."
%w(Designed Assembled Painted Tested).each do |state|
  puts "- #{state}"
  VehicleState.create_with(name: state).find_or_create_by!(code: state.downcase.first)
end

puts "Seeding Vehicles..."
1.upto(5) do |i|
  v = Vehicle.find_or_create_by!(code: "DEMO-#{i}")
  puts "- #{v.code}"
end
