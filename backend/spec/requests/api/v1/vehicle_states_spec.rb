require "rails_helper"

describe "vehicle_states", type: :request do
  let!(:assembler) { create(:assembler) }
  let!(:executive) { create(:assembler, :executive) }

  describe "GET /vehicle_states" do
    before { create_list(:vehicle_state, 3) }
    before { get api_v1_vehicle_states_path, headers: auth_header }

    subject { response }

    authorized :assembler!, :executive do
      let(:vehicle_states)         { VehicleState.all }
      let(:expected_json_response) { serialized(vehicle_states, :v1) }

      it { is_expected.to have_json_response(expected_json_response) }
    end
  end

  describe "POST /vehicle_states" do
    before { post api_v1_vehicle_states_path, headers: auth_header,
                                              params: vehicle_state_params }

    let(:vehicle_state_params) { { vehicle_state: attributes_for(:vehicle_state).slice(:name) } }

    subject { response }

    context "with valid params" do
      authorized :assembler!, :executive do
        let(:vehicle_state)          { VehicleState.find_by(vehicle_state_params[:vehicle_state]) }
        let(:expected_json_response) { serialized(vehicle_state, :v1) }

        it { is_expected.to have_json_response(expected_json_response) }
      end
    end

    context "with invalid params" do
      let(:vehicle_state_params) { { vehicle_state: { name: "" } } }

      authorized :assembler!, :executive do
        let(:authorized_status) { :unprocessable_entity }
      end
    end
  end

  describe "PATCH /vehicle_states/:code" do
    before { patch api_v1_vehicle_state_path(vehicle_state), headers: auth_header,
                                                             params: new_vehicle_state_params }

    let(:vehicle_state) { create(:vehicle_state) }

    subject { response }

    context "with valid params" do
      let(:new_vehicle_state_params) { { vehicle_state: attributes_for(:vehicle_state).slice(:name) } }

      authorized :assembler!, :executive do
        it "should update vehicle state" do
          expect(vehicle_state.reload.name).to eq(new_vehicle_state_params[:vehicle_state][:name])
        end
      end
    end

    context "with invalid params" do
      let(:new_vehicle_state_params) { { vehicle_state: { name: "" } } }

      authorized :assembler!, :executive do
        let(:authorized_status) { :unprocessable_entity }

        it "should not update vehicle state" do
          expect(vehicle_state.reload.name).to eq(vehicle_state.name)
        end
      end
    end
  end

  describe "DELETE /vehicle_states/:code" do
    let(:vehicle_state) { create(:vehicle_state) }

    subject { response }

    context "with valid params" do
      before { delete api_v1_vehicle_state_path(vehicle_state), headers: auth_header }

      authorized :assembler!, :executive do
        it "should destroy vehicle state" do
          expect(VehicleState.find_by(code: vehicle_state.code)).to be_nil
        end
      end
    end

    context "with invalid params" do
      before { create(:vehicle, state: vehicle_state) }
      before { delete api_v1_vehicle_state_path(vehicle_state), headers: auth_header }

      authorized :assembler!, :executive do
        let(:authorized_status) { :unprocessable_entity }

        it "should not destroy vehicle state" do
          expect(VehicleState.find_by(code: vehicle_state.code)).to eq(vehicle_state)
        end
      end
    end
  end
end
