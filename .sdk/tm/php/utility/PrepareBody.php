<?php
declare(strict_types=1);

// NovayaGazeta SDK utility: prepare_body

class NovayaGazetaPrepareBody
{
    public static function call(NovayaGazetaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
