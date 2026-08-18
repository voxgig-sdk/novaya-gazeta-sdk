
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


  main = {
    name: 'NovayaGazeta',
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
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "type": "`$STRING`"
        },
        {
          "name": "content",
          "type": "`$STRING`"
        },
        {
          "name": "publishedDate",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
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
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
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

