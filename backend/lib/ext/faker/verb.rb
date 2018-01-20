module Faker
  class Verb < Base
    class << self
      PAST_PARTICIPLES = [
        "Abashed",
        "Befallen",
        "Covered",
        "Disused",
        "Excluded",
        "Forsaken",
        "Given",
        "Hoaxed",
        "Initiated",
        "Jumped",
        "Kidded",
        "Lent",
        "Mixed",
        "Nourished",
        "Oppressed",
        "Pacified",
        "Questioned",
        "Read",
        "Sanctioned",
        "Tasted",
        "Used",
        "Vied",
        "Wet",
        "Yelled",
        "Zincked"
      ].freeze

      def past_participle
        sample(PAST_PARTICIPLES)
      end
    end
  end
end
