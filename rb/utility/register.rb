# NovayaGazeta SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NovayaGazetaUtility.registrar = ->(u) {
  u.clean = NovayaGazetaUtilities::Clean
  u.done = NovayaGazetaUtilities::Done
  u.make_error = NovayaGazetaUtilities::MakeError
  u.feature_add = NovayaGazetaUtilities::FeatureAdd
  u.feature_hook = NovayaGazetaUtilities::FeatureHook
  u.feature_init = NovayaGazetaUtilities::FeatureInit
  u.fetcher = NovayaGazetaUtilities::Fetcher
  u.make_fetch_def = NovayaGazetaUtilities::MakeFetchDef
  u.make_context = NovayaGazetaUtilities::MakeContext
  u.make_options = NovayaGazetaUtilities::MakeOptions
  u.make_request = NovayaGazetaUtilities::MakeRequest
  u.make_response = NovayaGazetaUtilities::MakeResponse
  u.make_result = NovayaGazetaUtilities::MakeResult
  u.make_point = NovayaGazetaUtilities::MakePoint
  u.make_spec = NovayaGazetaUtilities::MakeSpec
  u.make_url = NovayaGazetaUtilities::MakeUrl
  u.param = NovayaGazetaUtilities::Param
  u.prepare_auth = NovayaGazetaUtilities::PrepareAuth
  u.prepare_body = NovayaGazetaUtilities::PrepareBody
  u.prepare_headers = NovayaGazetaUtilities::PrepareHeaders
  u.prepare_method = NovayaGazetaUtilities::PrepareMethod
  u.prepare_params = NovayaGazetaUtilities::PrepareParams
  u.prepare_path = NovayaGazetaUtilities::PreparePath
  u.prepare_query = NovayaGazetaUtilities::PrepareQuery
  u.result_basic = NovayaGazetaUtilities::ResultBasic
  u.result_body = NovayaGazetaUtilities::ResultBody
  u.result_headers = NovayaGazetaUtilities::ResultHeaders
  u.transform_request = NovayaGazetaUtilities::TransformRequest
  u.transform_response = NovayaGazetaUtilities::TransformResponse
}
