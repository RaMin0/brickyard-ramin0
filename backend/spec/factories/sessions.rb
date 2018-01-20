FactoryBot.define do
  factory :session do
    email    Faker::Internet.email
    password Faker::Internet.password
  end
end
