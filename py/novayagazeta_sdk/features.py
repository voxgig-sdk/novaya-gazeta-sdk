# NovayaGazeta SDK feature factory

from novayagazeta_sdk.feature.base_feature import NovayaGazetaBaseFeature
from novayagazeta_sdk.feature.test_feature import NovayaGazetaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NovayaGazetaBaseFeature(),
        "test": lambda: NovayaGazetaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
