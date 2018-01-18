FactoryBot.define do
  factory :vehicle_state do
    name { Faker::Vehicle.unique.state }
  end
end
