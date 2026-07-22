-- Typed models for the NovayaGazeta SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Article
---@field author? string
---@field category? string
---@field content? string
---@field published_date? string
---@field slug? string
---@field tag? table
---@field title? string

---@class ArticleListMatch
---@field author? string
---@field category? string
---@field content? string
---@field published_date? string
---@field slug? string
---@field tag? table
---@field title? string

---@class Theme
---@field description? string
---@field id? string
---@field name? string
---@field slug? string

---@class ThemeListMatch
---@field description? string
---@field id? string
---@field name? string
---@field slug? string

local M = {}

return M
