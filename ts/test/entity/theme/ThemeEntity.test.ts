

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Theme description","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Theme identifier","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Theme name","t":"`$STRING`","key$":"name","index$":2},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"URL slug for the theme","t":"`$STRING`","key$":"slug","index$":3}},"id":{"field":"id","name":"id"},"name":"theme","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /get/themes","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/get/themes","q":{},"r":{},"s":[{"lit":"get"},{"lit":"themes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"theme","name__orig":"theme","Name":"Theme","name_":"theme","name-":"theme","NAME":"THEME","index$":1}, {"active":true,"entity":"theme","key$":"BasicThemeFlow","kind":"basic","name":"BasicThemeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"theme_ref01"}}],"index$":0}]}, 'Theme', {"GET /get/themes":{"protocol":"http","operationId":"getThemesList","responses":{"200":{"description":"Successfully retrieved themes list","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Theme identifier","key$":"id"},"name":{"type":"string","description":"Theme name","key$":"name"},"slug":{"type":"string","description":"URL slug for the theme","key$":"slug"},"description":{"type":"string","description":"Theme description","key$":"description"}},"index$":0}}}}},"400":{"description":"Bad request"},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"}})
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
  
