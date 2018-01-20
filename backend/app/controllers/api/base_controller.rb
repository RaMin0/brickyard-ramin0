class Api::BaseController < ApplicationController
  # Concerns
  include Auth

  # Attributes
  self.responder = ApplicationResponder

  # Plugins
  respond_to :json
end
