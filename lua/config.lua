-- NovayaGazeta SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NovayaGazeta",
      slug = "novaya-gazeta",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://novayagazeta.eu/api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["article"] = {},
        ["theme"] = {},
      },
    },
    entity = {
      ["article"] = {
        ["fields"] = {
          {
            ["name"] = "author",
            ["title"] = "Author",
            ["type"] = "`$STRING`",
            ["short"] = "Article author",
          },
          {
            ["name"] = "category",
            ["title"] = "Category",
            ["type"] = "`$STRING`",
            ["short"] = "Article category",
          },
          {
            ["name"] = "content",
            ["title"] = "Content",
            ["type"] = "`$STRING`",
            ["short"] = "Article content",
          },
          {
            ["name"] = "publishedDate",
            ["title"] = "Published Date",
            ["type"] = "`$STRING`",
            ["short"] = "Publication date",
            ["format"] = "date-time",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["short"] = "Article slug",
          },
          {
            ["name"] = "tags",
            ["title"] = "Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Article tags",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Article title",
          },
        },
        ["name"] = "article",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/get/slugs",
                ["segments"] = {
                  {
                    ["lit"] = "get",
                  },
                  {
                    ["lit"] = "slugs",
                  },
                },
                ["parts"] = {
                  "get",
                  "slugs",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "eu",
                      ["orig"] = "eu",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["type"] = "`$ARRAY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "eu",
                    "slug",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["theme"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Theme description",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Theme identifier",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Theme name",
          },
          {
            ["name"] = "slug",
            ["title"] = "Slug",
            ["type"] = "`$STRING`",
            ["short"] = "URL slug for the theme",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "theme",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/get/themes",
                ["segments"] = {
                  {
                    ["lit"] = "get",
                  },
                  {
                    ["lit"] = "themes",
                  },
                },
                ["parts"] = {
                  "get",
                  "themes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
