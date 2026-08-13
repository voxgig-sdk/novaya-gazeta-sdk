# frozen_string_literal: true

# Typed models for the NovayaGazeta SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Article entity data model.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] publishedDate
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Article = Struct.new(
  :author,
  :category,
  :content,
  :publishedDate,
  :slug,
  :tags,
  :title,
  keyword_init: true
)

# Request payload for Article#list.
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] publishedDate
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ArticleListMatch = Struct.new(
  :author,
  :category,
  :content,
  :publishedDate,
  :slug,
  :tags,
  :title,
  keyword_init: true
)

# Theme entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
Theme = Struct.new(
  :description,
  :id,
  :name,
  :slug,
  keyword_init: true
)

# Request payload for Theme#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
ThemeListMatch = Struct.new(
  :description,
  :id,
  :name,
  :slug,
  keyword_init: true
)

