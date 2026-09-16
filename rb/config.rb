# NovayaGazeta SDK configuration

module NovayaGazetaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "NovayaGazeta",
        "slug" => "novaya-gazeta",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://novayagazeta.eu/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "article" => {},
          "theme" => {},
        },
      },
      "entity" => {
        "article" => {
          "fields" => [
            {
              "name" => "author",
              "short" => "Article author",
              "type" => "`$STRING`",
            },
            {
              "name" => "category",
              "short" => "Article category",
              "type" => "`$STRING`",
            },
            {
              "name" => "content",
              "short" => "Article content",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "publishedDate",
              "short" => "Publication date",
              "type" => "`$STRING`",
            },
            {
              "name" => "slug",
              "short" => "Article slug",
              "type" => "`$STRING`",
            },
            {
              "name" => "tags",
              "short" => "Article tags",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "title",
              "short" => "Article title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "article",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "eu",
                        "orig" => "eu",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$ARRAY`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/get/slugs",
                  "segments" => [
                    {
                      "lit" => "get",
                    },
                    {
                      "lit" => "slugs",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "eu",
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "get",
                    "slugs",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "theme" => {
          "fields" => [
            {
              "name" => "description",
              "short" => "Theme description",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Theme identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Theme name",
              "type" => "`$STRING`",
            },
            {
              "name" => "slug",
              "short" => "URL slug for the theme",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "theme",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/get/themes",
                  "segments" => [
                    {
                      "lit" => "get",
                    },
                    {
                      "lit" => "themes",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "get",
                    "themes",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    NovayaGazetaFeatures.make_feature(name)
  end
end
