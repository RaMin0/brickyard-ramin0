class Vehicle < ApplicationRecord
  # Validations
  validates :code, presence: true
  validates :code, uniqueness: true
end
