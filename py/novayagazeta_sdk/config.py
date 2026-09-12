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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Article author",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "short": "Article category",
            "type": "`$STRING`",
          },
          {
            "name": "content",
            "short": "Article content",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "publishedDate",
            "short": "Publication date",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "short": "Article slug",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "short": "Article tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "short": "Article title",
            "type": "`$STRING`",
          },
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
                      "example": False,
                      "kind": "query",
                      "name": "eu",
                      "orig": "eu",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$ARRAY`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "eu",
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "get",
                  "slugs",
                ],
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
            "short": "Theme description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Theme identifier",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Theme name",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "short": "URL slug for the theme",
            "type": "`$STRING`",
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "get",
                  "themes",
                ],
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
