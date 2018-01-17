class Assembler < ApplicationRecord
  # Validations
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  # Scopes
  scope :executives, -> { where(executive: true) }
end
