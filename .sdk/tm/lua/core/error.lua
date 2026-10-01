-- NovayaGazeta SDK error

local json = require("dkjson")

local NovayaGazetaError = {}
NovayaGazetaError.__index = NovayaGazetaError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function NovayaGazetaError.new(code, msg, ctx)
  local self = setmetatable({}, NovayaGazetaError)
  self.is_sdk_error = true
  self.sdk = "NovayaGazeta"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function NovayaGazetaError:context()
  return CONTEXT[self]
end


function NovayaGazetaError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function NovayaGazetaError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function NovayaGazetaError:to_json()
  return json.encode(self:to_table())
end


function NovayaGazetaError:__tostring()
  return self.msg
end


function NovayaGazetaError.__tojson(self)
  return self:to_json()
end


return NovayaGazetaError
