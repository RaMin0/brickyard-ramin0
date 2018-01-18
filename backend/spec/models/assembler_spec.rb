require "rails_helper"

RSpec.describe Assembler, type: :model do
  let(:custom_attributes) { nil }

  subject(:assembler) { build(:assembler, custom_attributes) }

  context "with valid attributes" do
    it { should be_valid }
  end

  context "with missing email" do
    let(:custom_attributes) { { email: nil } }

    it { should_not be_valid }
  end

  context "with duplicate email" do
    let(:another_assembler) { create(:assembler) }
    let(:custom_attributes) { { email: another_assembler.email } }

    it { should_not be_valid }
  end

  context "with invalid email" do
    let(:custom_attributes) { { email: "invalid" } }

    it { should_not be_valid }
  end
end
