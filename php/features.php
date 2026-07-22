<?php
declare(strict_types=1);

// NovayaGazeta SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NovayaGazetaFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NovayaGazetaBaseFeature();
            case "test":
                return new NovayaGazetaTestFeature();
            default:
                return new NovayaGazetaBaseFeature();
        }
    }
}
