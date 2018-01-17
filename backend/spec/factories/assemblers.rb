FactoryBot.define do
  factory :assembler do
    email Faker::Internet.email

    trait :executive do
      executive false
    end
  end
end
