# ProjectName SDK exists test

import pytest
from novayagazeta_sdk import NovayaGazetaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NovayaGazetaSDK.test(None, None)
        assert testsdk is not None
