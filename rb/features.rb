# NovayaGazeta SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NovayaGazetaFeatures
  def self.make_feature(name)
    case name
    when "base"
      NovayaGazetaBaseFeature.new
    when "ratelimit"
      NovayaGazetaRatelimitFeature.new
    when "retry"
      NovayaGazetaRetryFeature.new
    when "test"
      NovayaGazetaTestFeature.new
    when "timeout"
      NovayaGazetaTimeoutFeature.new
    else
      NovayaGazetaBaseFeature.new
    end
  end
end
