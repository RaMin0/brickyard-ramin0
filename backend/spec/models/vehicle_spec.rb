require "rails_helper"

describe Vehicle, type: :model do
  before(:all) { create_list(:vehicle_state, 3)  }
  after(:all)  { VehicleState.delete_all }

  let(:custom_attributes) { nil }

  subject(:vehicle) { build(:vehicle, custom_attributes) }

  context "with valid attributes" do
    it { should be_valid }
  end

  context "with missing code" do
    let(:custom_attributes) { { code: nil } }

    it { should_not be_valid }
  end

  context "with duplicate code" do
    let(:another_vehicle)   { create(:vehicle) }
    let(:custom_attributes) { { code: another_vehicle.code } }

    it { should_not be_valid }
  end

  context "with missing state" do
    let(:vehicle)           { create(:vehicle) }
    let(:custom_attributes) { { code: nil } }

    subject { vehicle.state }

    it "should assign state" do
      should be_present
    end

    it "should assign initial state" do
      should eq(VehicleState.initial)
    end
  end

  describe "#advance_state!" do
    let(:vehicle_states) { VehicleState.all }
    let(:vehicle)        { create(:vehicle) }

    subject { -> { vehicle.advance_state! } }

    context "can advance state" do
      before { vehicle.state = vehicle_states.first }

      it "should advance state" do
        should change { vehicle.state }.to(vehicle_states.second)
      end
    end

    context "can not advance state" do
      before { vehicle.state = vehicle_states.last }

      it "should not advance state" do
        should_not change { vehicle.state }
      end
    end
  end
end
