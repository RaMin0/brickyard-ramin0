require "rails_helper"

describe Vehicle, type: :model do
  let(:valid_attributes) { attributes_for(:vehicle) }

  subject { build(:vehicle, attributes) }

  context "with valid attributes" do
    let(:attributes) { valid_attributes }

    it { should be_valid }
  end

  context "with missing code" do
    let(:attributes) { valid_attributes.merge(code: nil) }

    it { should_not be_valid }
  end

  context "with duplicate code" do
    before { create(:vehicle, valid_attributes) }

    let(:attributes) { valid_attributes }

    it { should_not be_valid }
  end
end
