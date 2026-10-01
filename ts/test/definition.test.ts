import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "article",
    "accessor": "Article",
    "op": "list",
    "method": "GET",
    "path": "/get/slugs",
    "args": [],
    "select": {
      "eu": "v1",
      "slug": "v1"
    },
    "headers": [],
    "query": [
      "eu",
      "slugs"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "slug": "x",
        "title": "x",
        "content": "x",
        "author": "x",
        "publishedDate": "2026-01-01T00:00:00Z",
        "category": "x",
        "tags": [
          "x"
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "theme",
    "accessor": "Theme",
    "op": "list",
    "method": "GET",
    "path": "/get/themes",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "slug": "x",
        "description": "x"
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
