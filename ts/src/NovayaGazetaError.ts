
import { Context } from './Context'


class NovayaGazetaError extends Error {

  isNovayaGazetaError = true

  sdk = 'NovayaGazeta'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NovayaGazetaError
}

