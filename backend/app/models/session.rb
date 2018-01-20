class Session
  # Concerns
  include ActiveModel::Model
  include ActiveModel::Validations::Callbacks
  include ActiveModel::Serialization

  # Attributes
  attr_accessor :email, :password, :assembler

  # Validations
  validates :email, :password, presence: true
  validates :assembler, presence: { message: :authentication_failed },
                        if: -> { [email, password].all?(&:present?) }

  # Callbacks
  before_validation :authenticate

  # Class Methods
  def self.create(attrs)
    new(attrs).tap(&:validate)
  end

  # Methods
  def authenticate
    self.assembler = begin
      a = Assembler.find_by(email: email)
      a if a && a.authenticate(password)
    end
  end
end
