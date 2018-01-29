class ApplicationResponder < ActionController::Responder
  def api_location
    false
  end

  def api_behavior
    raise MissingRenderer.new(format) unless has_renderer?

    if get?
      display resource
    elsif post?
      display resource, status: :created, location: api_location
    elsif patch?
      display resource, status: :ok
    else
      head :no_content
    end
  end
end
