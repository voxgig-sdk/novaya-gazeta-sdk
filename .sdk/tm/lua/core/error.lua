-- NovayaGazeta SDK error

local NovayaGazetaError = {}
NovayaGazetaError.__index = NovayaGazetaError


function NovayaGazetaError.new(code, msg, ctx)
  local self = setmetatable({}, NovayaGazetaError)
  self.is_sdk_error = true
  self.sdk = "NovayaGazeta"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NovayaGazetaError:error()
  return self.msg
end


function NovayaGazetaError:__tostring()
  return self.msg
end


return NovayaGazetaError
