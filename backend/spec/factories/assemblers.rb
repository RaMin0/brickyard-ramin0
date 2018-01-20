FactoryBot.define do
  factory :assembler do
    email    { Faker::Internet.email }
    password { Faker::Internet.password }

    trait :executive do
      executive true
    end
  end
end
