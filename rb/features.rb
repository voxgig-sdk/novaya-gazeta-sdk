# NovayaGazeta SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NovayaGazetaFeatures
  def self.make_feature(name)
    case name
    when "base"
      NovayaGazetaBaseFeature.new
    when "test"
      NovayaGazetaTestFeature.new
    else
      NovayaGazetaBaseFeature.new
    end
  end
end
