require "rails_helper"

describe "vehicles", type: :request do
  before(:all) { create_list(:vehicle_state, 3)  }
  after(:all)  { VehicleState.delete_all }

  describe "GET /vehicles" do
    before { create_list(:vehicle, 5) }
    before { get api_v1_vehicles_path }

    let(:vehicles)               { Vehicle.all }
    let(:expected_json_response) { serialized(vehicles, :v1) }

    subject { response }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to have_json_response(expected_json_response) }
  end

  describe "POST /vehicles" do
    before { post api_v1_vehicles_path, params: vehicle_params }

    subject { response }

    context "with valid params" do
      let(:vehicle_params)         { { vehicle: attributes_for(:vehicle).slice(:code) } }
      let(:vehicle)                { Vehicle.find_by(vehicle_params[:vehicle]) }
      let(:expected_json_response) { serialized(vehicle, :v1) }

      it { is_expected.to have_http_status(:success) }
      it { is_expected.to have_json_response(expected_json_response) }
    end

    context "with invalid params" do
      let(:vehicle_params) { { vehicle: { code: "" } } }

      it { is_expected.to have_http_status(:unprocessable_entity) }
    end
  end

  describe "DELETE /vehicles/:id" do
    before { delete api_v1_vehicle_path(vehicle) }

    let(:vehicle) { create(:vehicle) }

    subject { response }

    context "with valid params" do
      it { is_expected.to have_http_status(:success) }
      it "should destroy vehicle" do
        expect(Vehicle.find_by(id: vehicle.id)).to be_nil
      end
    end
  end

  describe "PATCH /vehicles/:id/advance_state" do
    before { patch advance_state_api_v1_vehicle_path(vehicle) }

    let(:vehicle)        { create(:vehicle, vehicle_attributes) }
    let(:vehicle_states) { VehicleState.all }

    subject { response }

    context "with valid params" do
      let(:vehicle_attributes) { nil }

      it { is_expected.to have_http_status(:success) }
      it "should advance vehicle state" do
        expect(vehicle.reload.state).to eq(vehicle_states.second)
      end
    end

    context "with invalid params" do
      let(:vehicle_attributes) { { state: vehicle_states.last } }

      it { is_expected.to have_http_status(:unprocessable_entity) }
      it "should not advance vehicle state" do
        expect(vehicle.reload.state).to eq(vehicle.state)
      end
    end
  end
end
