

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NovayaGazetaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ThemeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NOVAYA_GAZETA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NOVAYA_GAZETA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NovayaGazetaSDK.test()
    const ent = testsdk.Theme()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NOVAYA_GAZETA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'theme.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Theme description","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Theme identifier","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Theme name","type":"`$STRING`","index$":2},{"active":true,"name":"slug","req":false,"short":"URL slug for the theme","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"theme","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /get/themes","json":"{\"operationId\":\"getThemesList\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Theme description\",\"type\":\"string\"},\"id\":{\"description\":\"Theme identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Theme name\",\"type\":\"string\"},\"slug\":{\"description\":\"URL slug for the theme\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successfully retrieved themes list\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/get/themes","segments":[{"lit":"get"},{"lit":"themes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"theme","name__orig":"theme","Name":"Theme","name_":"theme","name-":"theme","NAME":"THEME","index$":1}, {"active":true,"entity":"theme","key$":"BasicThemeFlow","kind":"basic","name":"BasicThemeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"theme_ref01"}}],"index$":0}]}, 'Theme')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let theme_ref01_data = Object.values(setup.data.existing.theme)[0] as any

    // LIST
    const theme_ref01_ent = client.Theme()
    const theme_ref01_match: any = {}

    const theme_ref01_list = (await theme_ref01_ent.list(theme_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/theme/ThemeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NovayaGazetaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['theme01','theme02','theme03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NOVAYA_GAZETA_TEST_THEME_ENTID': idmap,
    'NOVAYA_GAZETA_TEST_LIVE': 'FALSE',
    'NOVAYA_GAZETA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NOVAYA_GAZETA_TEST_THEME_ENTID']

  const live = 'TRUE' === env.NOVAYA_GAZETA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NOVAYA_GAZETA_TEST_THEME_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NovayaGazetaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.NOVAYA_GAZETA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
