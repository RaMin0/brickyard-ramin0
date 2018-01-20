module JsonHelper
  def json_response
    -> { json_parse(response.body) }.call
  end

  def json_parse(json)
    JSON.parse(json, symbolize_names: true)
  end

  def serialized(resource, namespace = nil)
    namespace = [:api, namespace].compact.join("/").classify
    serialized = ActiveModelSerializers::SerializableResource.new(resource, namespace: namespace)
    json_parse(serialized.to_json)
  end

  RSpec::Matchers.define :have_json_response do |expected|
    match do |response|
      expect(@actual = json_response).to eq(expected)
    end

    description     { "respond with expected JSON" }
    failure_message { |actual| "expected #{actual} to match expected JSON" }

    diffable
  end
end

RSpec.configure { |config| config.include(JsonHelper, type: :request) }
