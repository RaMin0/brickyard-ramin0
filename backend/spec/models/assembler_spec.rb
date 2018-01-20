require "rails_helper"

RSpec.describe Assembler, type: :model do
  let(:custom_attributes) { nil }

  subject(:assembler) { build(:assembler, custom_attributes) }

  context "with valid attributes" do
    it { is_expected.to be_valid }
  end

  context "with missing email" do
    let(:custom_attributes) { { email: nil } }

    it { is_expected.not_to be_valid }
  end

  context "with duplicate email" do
    let(:another_assembler) { create(:assembler) }
    let(:custom_attributes) { { email: another_assembler.email } }

    it { is_expected.not_to be_valid }
  end

  context "with invalid email" do
    let(:custom_attributes) { { email: "invalid" } }

    it { is_expected.not_to be_valid }
  end
end
