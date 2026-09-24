
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NovayaGazetaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NovayaGazetaSDK.test()
    equal(testsdk instanceof NovayaGazetaSDK, true,
      'NovayaGazetaSDK.test() must return a client synchronously')
  })

})
