package core

type NovayaGazetaError struct {
	IsNovayaGazetaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNovayaGazetaError(code string, msg string, ctx *Context) *NovayaGazetaError {
	return &NovayaGazetaError{
		IsNovayaGazetaError: true,
		Sdk:              "NovayaGazeta",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NovayaGazetaError) Error() string {
	return e.Msg
}
