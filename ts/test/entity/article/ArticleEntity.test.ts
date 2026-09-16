

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


describe('ArticleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NOVAYA_GAZETA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NOVAYA_GAZETA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NovayaGazetaSDK.test()
    const ent = testsdk.Article()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NOVAYA_GAZETA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'article.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"author","req":false,"short":"Article author","type":"`$STRING`","index$":0},{"active":true,"name":"category","req":false,"short":"Article category","type":"`$STRING`","index$":1},{"active":true,"name":"content","req":false,"short":"Article content","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"publishedDate","req":false,"short":"Publication date","type":"`$STRING`","index$":3},{"active":true,"name":"slug","req":false,"short":"Article slug","type":"`$STRING`","index$":4},{"active":true,"name":"tags","req":false,"short":"Article tags","type":"`$ARRAY`","index$":5},{"active":true,"name":"title","req":false,"short":"Article title","type":"`$STRING`","index$":6}],"name":"article","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":false,"kind":"query","name":"eu","orig":"eu","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"slug","orig":"slug","reqd":true,"type":"`$ARRAY`","index$":1}]},"contract":{"id":"GET /get/slugs","json":"{\"operationId\":\"getSlugsList\",\"parameters\":[{\"description\":\"Whether to use novayagazeta.eu (true) or novayagazeta.ru (false)\",\"in\":\"query\",\"name\":\"eu\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Array of article slugs to retrieve (e.g., 2026/04/24/daleko-idushchie-vyvody-nalichnykh)\",\"explode\":true,\"in\":\"query\",\"name\":\"slugs\",\"required\":true,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"style\":\"form\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"author\":{\"description\":\"Article author\",\"type\":\"string\"},\"category\":{\"description\":\"Article category\",\"type\":\"string\"},\"content\":{\"description\":\"Article content\",\"type\":\"string\"},\"publishedDate\":{\"description\":\"Publication date\",\"format\":\"date-time\",\"type\":\"string\"},\"slug\":{\"description\":\"Article slug\",\"type\":\"string\"},\"tags\":{\"description\":\"Article tags\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successfully retrieved articles\"},\"400\":{\"description\":\"Bad request - invalid slug format\"},\"404\":{\"description\":\"Articles not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/get/slugs","segments":[{"lit":"get"},{"lit":"slugs"}],"select":{"exist":["eu","slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":0}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"article_ref01"}}],"index$":0}]}, 'Article')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let article_ref01_data = Object.values(setup.data.existing.article)[0] as any

    // LIST
    const article_ref01_ent = client.Article()
    const article_ref01_match: any = {}

    const article_ref01_list = (await article_ref01_ent.list(article_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/article/ArticleTestData.json')

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
    ['article01','article02','article03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NOVAYA_GAZETA_TEST_ARTICLE_ENTID': idmap,
    'NOVAYA_GAZETA_TEST_LIVE': 'FALSE',
    'NOVAYA_GAZETA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NOVAYA_GAZETA_TEST_ARTICLE_ENTID']

  const live = 'TRUE' === env.NOVAYA_GAZETA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NOVAYA_GAZETA_TEST_ARTICLE_ENTID']
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
  
