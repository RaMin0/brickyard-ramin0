module JsonHelper
  def json_response
    -> { JSON.parse(response.body, symbolize_names: true) }.call
  end

  RSpec::Matchers.define :have_json_response do |expected|
    match do |response|
      expect(@actual = json_response).to eq(expected)
    end

    description { "respond with expected JSON" }

    diffable
  end
end

RSpec.configure { |config| config.include(JsonHelper, type: :request) }
