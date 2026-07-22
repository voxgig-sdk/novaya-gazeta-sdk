// Typed models for the NovayaGazeta SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Article is the typed data model for the article entity.
type Article struct {
	Author *string `json:"author,omitempty"`
	Category *string `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	PublishedDate *string `json:"published_date,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
}

// ArticleListMatch is the typed request payload for Article.ListTyped.
type ArticleListMatch struct {
	Author *string `json:"author,omitempty"`
	Category *string `json:"category,omitempty"`
	Content *string `json:"content,omitempty"`
	PublishedDate *string `json:"published_date,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Theme is the typed data model for the theme entity.
type Theme struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// ThemeListMatch is the typed request payload for Theme.ListTyped.
type ThemeListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
