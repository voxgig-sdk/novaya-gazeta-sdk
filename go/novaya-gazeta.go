package voxgignovayagazetasdk

import (
	"github.com/voxgig-sdk/novaya-gazeta-sdk/go/core"
	"github.com/voxgig-sdk/novaya-gazeta-sdk/go/entity"
	"github.com/voxgig-sdk/novaya-gazeta-sdk/go/feature"
	_ "github.com/voxgig-sdk/novaya-gazeta-sdk/go/utility"
)

// Type aliases preserve external API.
type NovayaGazetaSDK = core.NovayaGazetaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NovayaGazetaEntity = core.NovayaGazetaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NovayaGazetaError = core.NovayaGazetaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewArticleEntityFunc = func(client *core.NovayaGazetaSDK, entopts map[string]any) core.NovayaGazetaEntity {
		return entity.NewArticleEntity(client, entopts)
	}
	core.NewThemeEntityFunc = func(client *core.NovayaGazetaSDK, entopts map[string]any) core.NovayaGazetaEntity {
		return entity.NewThemeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNovayaGazetaSDK = core.NewNovayaGazetaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewNovayaGazetaSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *NovayaGazetaSDK  { return NewNovayaGazetaSDK(nil) }
func Test() *NovayaGazetaSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
