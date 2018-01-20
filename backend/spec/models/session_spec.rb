require "rails_helper"

describe Session, type: :model do
  describe "#authenticate" do
    let(:assembler)         { create(:assembler) }
    let(:valid_credentials) { assembler.slice(:email, :password).symbolize_keys }
    let(:credentials)       { valid_credentials }
    let(:session)           { build(:session, credentials) }

    subject { session.authenticate }

    context "with valid credentials" do
      it { is_expected.to eq(assembler) }
    end

    context "with invalid email" do
      let(:credentials) { valid_credentials.merge(email: "invalid") }

      it { is_expected.to be_nil }
    end

    context "with invalid password" do
      let(:credentials) { valid_credentials.merge(password: "invalid") }

      it { is_expected.to be_nil }
    end

    context "with invalid credentials" do
      let(:credentials) { { email: "invalid", password: "invalid" } }

      it { is_expected.to be_nil }
    end
  end
end
