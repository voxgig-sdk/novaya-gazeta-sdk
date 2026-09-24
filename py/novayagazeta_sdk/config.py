# NovayaGazeta SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NovayaGazeta",
            "slug": "novaya-gazeta",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://novayagazeta.eu/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "article": {},
                "theme": {},
            },
        },
        "entity": {
      "article": {
        "fields": [
          {
            "name": "author",
            "title": "Author",
            "type": "`$STRING`",
            "short": "Article author",
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "short": "Article category",
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "short": "Article content",
          },
          {
            "name": "publishedDate",
            "title": "Published Date",
            "type": "`$STRING`",
            "short": "Publication date",
            "format": "date-time",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "Article slug",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "Article tags",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Article title",
          },
        ],
        "name": "article",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/get/slugs",
                "segments": [
                  {
                    "lit": "get",
                  },
                  {
                    "lit": "slugs",
                  },
                ],
                "parts": [
                  "get",
                  "slugs",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "eu",
                      "orig": "eu",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "eu",
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "theme": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Theme description",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Theme identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Theme name",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "URL slug for the theme",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "theme",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/get/themes",
                "segments": [
                  {
                    "lit": "get",
                  },
                  {
                    "lit": "themes",
                  },
                ],
                "parts": [
                  "get",
                  "themes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
