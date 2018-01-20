class VehicleState < ApplicationRecord
  # Plugins
  acts_as_list

  # Validations
  validates :code, :name, presence: true
  validates :code, uniqueness: true

  # Relations
  has_many :vehicles, foreign_key: :state_code, dependent: :restrict_with_error

  # Callbacks
  before_validation :generate_code, unless: :code?

  # Scopes
  default_scope -> { order(:position) }

  # Aliases
  class << self
    alias_method :initial, :first
  end

private

  def generate_code
    self.code = self.name.downcase.first if name?
  end
end
