<?php
declare(strict_types=1);

// NovayaGazeta SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NovayaGazetaMakeContext
{
    public static function call(array $ctxmap, ?NovayaGazetaContext $basectx): NovayaGazetaContext
    {
        return new NovayaGazetaContext($ctxmap, $basectx);
    }
}
