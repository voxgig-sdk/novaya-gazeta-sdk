# NovayaGazeta SDK utility: prepare_body
require_relative 'media'
module NovayaGazetaUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NovayaGazetaUtilities.raw_body(ctx.reqdata) if NovayaGazetaUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
