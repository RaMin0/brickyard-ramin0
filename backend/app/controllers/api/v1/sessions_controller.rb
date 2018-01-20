class Api::V1::SessionsController < Api::V1::BaseController
  def create
    respond_with Session.create(session_params)
  end

protected

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
