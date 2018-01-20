class Api::V1::VehicleSerializer < ApplicationSerializer
  # Attributes
  attributes :id, :code
  attributes :created_at, :updated_at

  # Relations
  belongs_to :state
  belongs_to :next_state
end
