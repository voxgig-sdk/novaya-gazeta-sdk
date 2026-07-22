<?php
declare(strict_types=1);

// NovayaGazeta SDK exists test

require_once __DIR__ . '/../novayagazeta_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NovayaGazetaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
