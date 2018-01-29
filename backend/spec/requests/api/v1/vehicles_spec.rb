require "rails_helper"

describe "vehicles", type: :request do
  before(:all) { create_list(:vehicle_state, 3)  }
  after(:all)  { VehicleState.delete_all }

  let!(:assembler) { create(:assembler) }
  let!(:executive) { create(:assembler, :executive) }

  describe "GET /vehicles" do
    before { create_list(:vehicle, 5) }
    before { get api_v1_vehicles_path, headers: auth_header }

    subject { response }

    authorized :assembler, :executive do
      let(:vehicles)               { Vehicle.all }
      let(:expected_json_response) { serialized(vehicles, :v1) }

      it { is_expected.to have_json_response(expected_json_response) }
    end
  end

  describe "POST /vehicles" do
    before { post api_v1_vehicles_path, headers: auth_header,
                                        params: vehicle_params }

    subject { response }

    context "with valid params" do
      let(:vehicle_params) { { vehicle: attributes_for(:vehicle).slice(:code) } }

      authorized :assembler!, :executive do
        let(:vehicle)                { Vehicle.find_by(vehicle_params[:vehicle]) }
        let(:expected_json_response) { serialized(vehicle, :v1) }

        it { is_expected.to have_json_response(expected_json_response) }
      end
    end

    context "with invalid params" do
      let(:vehicle_params) { { vehicle: { code: "" } } }

      authorized :assembler!, :executive do
        let(:authorized_status) { :unprocessable_entity }
      end
    end
  end

  describe "DELETE /vehicles/:id" do
    before { delete api_v1_vehicle_path(vehicle), headers: auth_header }

    let(:vehicle) { create(:vehicle) }

    subject { response }

    context "with valid params" do
      authorized :assembler!, :executive do
        it "should destroy vehicle" do
          expect(Vehicle.find_by(id: vehicle.id)).to be_nil
        end
      end
    end
  end

  describe "PATCH /vehicles/:id/advance_state" do
    before { patch advance_state_api_v1_vehicle_path(vehicle), headers: auth_header }

    let(:vehicle)        { create(:vehicle, vehicle_attributes) }
    let(:vehicle_states) { VehicleState.all }

    subject { response }

    context "with valid params" do
      let(:vehicle_attributes) { nil }

      authorized :assembler, :executive do
        it "should advance vehicle state" do
          expect(vehicle.reload.state).to eq(vehicle_states.second)
        end
      end
    end

    context "with invalid params" do
      let(:vehicle_attributes) { { state: vehicle_states.last } }

      authorized :assembler, :executive do
        let(:authorized_status) { :unprocessable_entity }

        it "should not advance vehicle state" do
          expect(vehicle.reload.state).to eq(vehicle.state)
        end
      end
    end
  end
end
