package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewArticleEntityFunc func(client *NovayaGazetaSDK, entopts map[string]any) NovayaGazetaEntity

var NewThemeEntityFunc func(client *NovayaGazetaSDK, entopts map[string]any) NovayaGazetaEntity

