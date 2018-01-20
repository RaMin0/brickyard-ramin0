class Assembler < ApplicationRecord
  # Attributes
  alias_attribute :password_digest, :encrypted_password

  # Plugins
  has_secure_password
  has_secure_token

  # Validations
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  # Scopes
  scope :executives, -> { where(executive: true) }
end
