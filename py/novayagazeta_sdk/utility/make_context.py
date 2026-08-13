# NovayaGazeta SDK utility: make_context

from novayagazeta_sdk.core.context import NovayaGazetaContext


def make_context_util(ctxmap, basectx):
    return NovayaGazetaContext(ctxmap, basectx)
