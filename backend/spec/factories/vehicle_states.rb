FactoryBot.define do
  factory :vehicle_state do
    name { Faker::Verb.unique.past_participle }
  end
end
