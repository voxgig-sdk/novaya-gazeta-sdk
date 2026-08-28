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
  publishedDate?: string
  slug?: string
  tags?: any[]
  title?: string
}

export interface ArticleListMatch {
  eu?: boolean
  slug: any[]
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

