class Api::BaseController < ApplicationController
  # Attributes
  self.responder = ApplicationResponder

  # Plugins
  respond_to :json
end
