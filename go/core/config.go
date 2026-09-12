package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "NovayaGazeta",
			"slug": "novaya-gazeta",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://novayagazeta.eu/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"article": map[string]any{},
				"theme": map[string]any{},
			},
		},
		"entity": map[string]any{
			"article": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"short": "Article author",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"short": "Article category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "content",
						"short": "Article content",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "publishedDate",
						"short": "Publication date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"short": "Article slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Article tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "Article title",
						"type": "`$STRING`",
					},
				},
				"name": "article",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "eu",
											"orig": "eu",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$ARRAY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/get/slugs",
								"segments": []any{
									map[string]any{
										"lit": "get",
									},
									map[string]any{
										"lit": "slugs",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"eu",
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"get",
									"slugs",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"theme": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Theme description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Theme identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Theme name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"short": "URL slug for the theme",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "theme",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/get/themes",
								"segments": []any{
									map[string]any{
										"lit": "get",
									},
									map[string]any{
										"lit": "themes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"get",
									"themes",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
