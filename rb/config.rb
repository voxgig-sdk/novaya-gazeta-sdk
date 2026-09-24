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
              "title" => "Author",
              "type" => "`$STRING`",
              "short" => "Article author",
            },
            {
              "name" => "category",
              "title" => "Category",
              "type" => "`$STRING`",
              "short" => "Article category",
            },
            {
              "name" => "content",
              "title" => "Content",
              "type" => "`$STRING`",
              "short" => "Article content",
            },
            {
              "name" => "publishedDate",
              "title" => "Published Date",
              "type" => "`$STRING`",
              "short" => "Publication date",
              "format" => "date-time",
            },
            {
              "name" => "slug",
              "title" => "Slug",
              "type" => "`$STRING`",
              "short" => "Article slug",
            },
            {
              "name" => "tags",
              "title" => "Tags",
              "type" => "`$ARRAY`",
              "short" => "Article tags",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "Article title",
            },
          ],
          "name" => "article",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                  "parts" => [
                    "get",
                    "slugs",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "eu",
                        "orig" => "eu",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "slug",
                        "orig" => "slug",
                        "type" => "`$ARRAY`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "eu",
                      "slug",
                    ],
                  },
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
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Theme description",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Theme identifier",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Theme name",
            },
            {
              "name" => "slug",
              "title" => "Slug",
              "type" => "`$STRING`",
              "short" => "URL slug for the theme",
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
                  "parts" => [
                    "get",
                    "themes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
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
