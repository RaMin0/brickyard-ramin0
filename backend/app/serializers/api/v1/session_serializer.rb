class Api::V1::SessionSerializer < ApplicationSerializer
  # Attributes
  attributes :email

  # Relations
  belongs_to :assembler
end
