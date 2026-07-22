# NovayaGazeta SDK utility: make_context
require_relative '../core/context'
module NovayaGazetaUtilities
  MakeContext = ->(ctxmap, basectx) {
    NovayaGazetaContext.new(ctxmap, basectx)
  }
end
