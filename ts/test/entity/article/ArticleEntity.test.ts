

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":false,"sh":"Article author","t":"`$STRING`","key$":"author","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Article category","t":"`$STRING`","key$":"category","index$":1},"content":{"a":true,"h":"Content","n":"content","r":false,"sh":"Article content","t":"`$STRING`","key$":"content","index$":2},"publishedDate":{"a":true,"fo":"date-time","h":"Published Date","n":"publishedDate","r":false,"sh":"Publication date","t":"`$STRING`","key$":"publishedDate","index$":3},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"Article slug","t":"`$STRING`","key$":"slug","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Article tags","t":"`$ARRAY`","key$":"tags","index$":5},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Article title","t":"`$STRING`","key$":"title","index$":6}},"name":"article","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /get/slugs","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"eu","or":"eu","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"slug","or":"slug","r":true,"t":"`$ARRAY`","index$":1}]},"k":"http","m":"GET","o":"/get/slugs","q":{"exist":["eu","slug"]},"r":{},"s":[{"lit":"get"},{"lit":"slugs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":0}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"article_ref01"}}],"index$":0}]}, 'Article', {"GET /get/slugs":{"protocol":"http","operationId":"getSlugsList","responses":{"200":{"description":"Successfully retrieved articles","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"slug":{"type":"string","description":"Article slug","key$":"slug"},"title":{"type":"string","description":"Article title","key$":"title"},"content":{"type":"string","description":"Article content","key$":"content"},"author":{"type":"string","description":"Article author","key$":"author"},"publishedDate":{"type":"string","format":"date-time","description":"Publication date","key$":"publishedDate"},"category":{"type":"string","description":"Article category","key$":"category"},"tags":{"type":"array","items":{"type":"string"},"description":"Article tags","key$":"tags"}},"index$":0}}}}},"400":{"description":"Bad request - invalid slug format"},"404":{"description":"Articles not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"eu","in":"query","description":"Whether to use novayagazeta.eu (true) or novayagazeta.ru (false)","required":false,"schema":{"type":"boolean","default":false},"index$":0},{"name":"slugs","in":"query","description":"Array of article slugs to retrieve (e.g., 2026/04/24/daleko-idushchie-vyvody-nalichnykh)","required":true,"schema":{"type":"array","items":{"type":"string"}},"style":"form","explode":true,"index$":1}],"securitySource":"unspecified"}})
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
  
