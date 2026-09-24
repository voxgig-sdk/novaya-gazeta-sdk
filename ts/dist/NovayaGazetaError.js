"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovayaGazetaError = void 0;
class NovayaGazetaError extends Error {
    isNovayaGazetaError = true;
    sdk = 'NovayaGazeta';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NovayaGazetaError = NovayaGazetaError;
//# sourceMappingURL=NovayaGazetaError.js.map