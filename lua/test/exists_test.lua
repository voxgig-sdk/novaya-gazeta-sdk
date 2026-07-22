-- NovayaGazeta SDK exists test

local sdk = require("novaya-gazeta_sdk")

describe("NovayaGazetaSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
