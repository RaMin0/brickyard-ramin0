module AuthHelper
  module ExampleGroups
    def authorized(*permissions, &block)
      permissions.each do |permission|
        role, forbidden = permission.to_s.scan(/^(.+?)(!?)$/).first.map(&:presence)

        context "authorized as #{role}" do
          let(:auth_header)       { auth_header_for(send role) }
          let(:authorized_status) { :success }

          if forbidden
            it { is_expected.to have_http_status(:forbidden) }
            next
          end

          instance_exec(&block) unless block.nil?
          it { is_expected.to have_http_status(authorized_status) }
        end
      end

      context "unauthenticated" do
        let(:auth_header) { nil }

        it { is_expected.to have_http_status(:unauthorized) }
      end
    end
  end

  module Examples
    def auth_header_for(resource)
      { "Authorization": "Token token=#{resource.token}, email=#{resource.email}" }
    end
  end
end

RSpec.configure do |config|
  config.extend(AuthHelper::ExampleGroups, type: :request)
  config.include(AuthHelper::Examples,     type: :request)
end
