
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NovayaGazeta',
        slug: "novaya-gazeta",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://novayagazeta.eu/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      article: {
      },

      theme: {
      },

    }
  }


  entity = {
    "article": {
      "fields": [
        {
          "name": "author",
          "short": "Article author",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "short": "Article category",
          "type": "`$STRING`"
        },
        {
          "name": "content",
          "short": "Article content",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "publishedDate",
          "short": "Publication date",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "short": "Article slug",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Article tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "Article title",
          "type": "`$STRING`"
        }
      ],
      "name": "article",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "eu",
                    "orig": "eu",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "slug",
                    "orig": "slug",
                    "reqd": true,
                    "type": "`$ARRAY`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/get/slugs",
              "segments": [
                {
                  "lit": "get"
                },
                {
                  "lit": "slugs"
                }
              ],
              "select": {
                "exist": [
                  "eu",
                  "slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "get",
                "slugs"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "theme": {
      "fields": [
        {
          "name": "description",
          "short": "Theme description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Theme identifier",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Theme name",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "short": "URL slug for the theme",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "theme",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/get/themes",
              "segments": [
                {
                  "lit": "get"
                },
                {
                  "lit": "themes"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "get",
                "themes"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

