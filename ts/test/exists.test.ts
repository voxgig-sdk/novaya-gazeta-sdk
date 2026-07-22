
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NovayaGazetaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NovayaGazetaSDK.test()
    equal(null !== testsdk, true)
  })

})
