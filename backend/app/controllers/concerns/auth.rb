module Auth
  extend ActiveSupport::Concern

  included do
    # Attributes
    attr_reader :current_assembler

    # Callbacks
    before_action :authenticate!
  end

  # Methods
  def authenticate!
    token, options = ActionController::HttpAuthentication::Token.token_and_options(request)
    head :unauthorized unless @current_assembler = Assembler.find_by(token: token,
                                                                    email: options.try(:[], :email))
  end

  def authorize!(role = :assembler)
    return head :unauthorized unless current_assembler

    head :forbidden unless case role
                           when :executive
                             current_assembler.executive?
                           else
                             true
                           end
  end
end
