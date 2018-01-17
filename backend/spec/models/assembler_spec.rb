require "rails_helper"

RSpec.describe Assembler, type: :model do
  let(:valid_attributes) { attributes_for(:assembler) }

  subject { build(:assembler, attributes) }

  context "with valid attributes" do
    let(:attributes) { valid_attributes }

    it { should be_valid }
  end

  context "with missing email" do
    let(:attributes) { valid_attributes.merge(email: nil) }

    it { should_not be_valid }
  end

  context "with duplicate email" do
    before { create(:assembler, valid_attributes) }

    let(:attributes) { valid_attributes }

    it { should_not be_valid }
  end

  context "with invalid email" do
    let(:attributes) { valid_attributes.merge(email: "invalid") }

    it { should_not be_valid }
  end
end
