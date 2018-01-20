require "rails_helper"

describe Vehicle, type: :model do
  before(:all) { create_list(:vehicle_state, 3)  }
  after(:all)  { VehicleState.delete_all }

  let(:custom_attributes) { nil }

  subject(:vehicle) { build(:vehicle, custom_attributes) }

  context "with valid attributes" do
    it { is_expected.to be_valid }
  end

  context "with missing code" do
    let(:custom_attributes) { { code: nil } }

    it { is_expected.not_to be_valid }
  end

  context "with duplicate code" do
    let(:another_vehicle)   { create(:vehicle) }
    let(:custom_attributes) { { code: another_vehicle.code } }

    it { is_expected.not_to be_valid }
  end

  context "with missing state" do
    let(:vehicle)           { create(:vehicle) }
    let(:custom_attributes) { { code: nil } }

    subject { vehicle.state }

    it "should assign state" do
      is_expected.to be_present
    end

    it "should assign initial state" do
      is_expected.to eq(VehicleState.initial)
    end
  end

  describe "#advance_state!" do
    let(:vehicle_states) { VehicleState.all }
    let(:vehicle)        { create(:vehicle) }

    subject { -> { vehicle.advance_state! } }

    context "can advance state" do
      before { vehicle.state = vehicle_states.first }

      it "should advance state" do
        is_expected.to change { vehicle.state }.to(vehicle_states.second)
      end
    end

    context "can not advance state" do
      before { vehicle.state = vehicle_states.last }

      it "should not advance state" do
        is_expected.not_to change { vehicle.state }
      end
    end
  end
end
