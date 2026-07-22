# NovayaGazeta SDK utility: make_context

from core.context import NovayaGazetaContext


def make_context_util(ctxmap, basectx):
    return NovayaGazetaContext(ctxmap, basectx)
