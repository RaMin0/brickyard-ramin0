class Vehicle < ApplicationRecord
  # Validations
  validates :code, presence: true
  validates :code, uniqueness: true

  # Relations
  belongs_to :state, class_name: "VehicleState", foreign_key: :state_code

  # Callbacks
  before_validation :assign_state, unless: :state_code?

  # Methods
  def advance_state!
    update(state: next_state) if can_advance_state?
  end

  def can_advance_state?
    !state.last?
  end

  def next_state
    state.lower_item
  end

private

  def assign_state
    self.state = VehicleState.initial
  end
end
