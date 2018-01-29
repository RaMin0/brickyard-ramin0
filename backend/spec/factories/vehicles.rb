FactoryBot.define do
  factory :vehicle do
    code { Faker::Vehicle.unique.vin }
  end
end
