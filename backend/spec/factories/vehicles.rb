FactoryBot.define do
  factory :vehicle do
    code Faker::Vehicle.vin
  end
end
