require "rails_helper"

describe VehicleState, type: :model do
  let(:custom_attributes) { nil }

  subject(:vehicle_state) { build(:vehicle_state, custom_attributes) }

  context "with valid attributes" do
    it { is_expected.to be_valid }
  end

  context "with missing code" do
    let(:vehicle_state)     { create(:vehicle_state) }
    let(:custom_attributes) { { code: nil } }

    subject { vehicle_state.code }

    it "should generate code" do
      is_expected.to be_present
    end
  end

  context "with duplicate code" do
    let(:another_vehicle_state) { create(:vehicle_state) }
    let(:custom_attributes) { { code: another_vehicle_state.code } }

    it { is_expected.not_to be_valid }
  end

  context "with missing name" do
    let(:custom_attributes) { { name: nil } }

    it { is_expected.not_to be_valid }
  end
end
