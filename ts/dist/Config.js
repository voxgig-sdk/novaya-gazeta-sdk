"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'NovayaGazeta',
        slug: "novaya-gazeta",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://novayagazeta.eu/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            article: {},
            theme: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map