
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "get",
                "slugs"
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
              }
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
              "parts": [
                "get",
                "themes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

