require "rails_helper"

RSpec.describe "auth", type: :request do
  describe "login" do
    before { post api_v1_sessions_path, params: credentials }

    let(:assembler) { create(:assembler) }
    let(:executive) { create(:assembler, :executive) }

    subject { response }

    context "as assembler" do
      context "with valid credentials" do
        let(:credentials) { { session: assembler.slice(:email, :password) } }
        let(:expected_json_response) {
          {
            email: assembler.email,
            assembler: assembler.slice(:email, :token, :executive).symbolize_keys
          }
        }

        it { should have_http_status(:success) }
        it { should have_json_response(expected_json_response) }
      end
    end

    context "as executive" do
      context "with valid credentials" do
        let(:credentials) { { session: executive.slice(:email, :password) } }
        let(:expected_json_response) {
          {
            email: executive.email,
            assembler: executive.slice(:email, :token, :executive).symbolize_keys
          }
        }

        it { should have_http_status(:success) }
        it { should have_json_response(expected_json_response) }
      end
    end

    context "with invalid credentials" do
      let(:credentials) { { session: { email: "invalid", password: "invalid" } } }
      let(:expected_json_response) {
        {
          errors: {
            assembler: [
              "failed to authenticate"
            ]
          }
        }
      }

      it { should have_http_status(:unprocessable_entity) }
      it { should have_json_response(expected_json_response) }
    end
  end
end
