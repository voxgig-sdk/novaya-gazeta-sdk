// Typed models for the NovayaGazeta SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Article {
  author?: string
  category?: string
  content?: string
  published_date?: string
  slug?: string
  tag?: any[]
  title?: string
}

export interface ArticleListMatch {
  author?: string
  category?: string
  content?: string
  published_date?: string
  slug?: string
  tag?: any[]
  title?: string
}

export interface Theme {
  description?: string
  id?: string
  name?: string
  slug?: string
}

export interface ThemeListMatch {
  description?: string
  id?: string
  name?: string
  slug?: string
}

