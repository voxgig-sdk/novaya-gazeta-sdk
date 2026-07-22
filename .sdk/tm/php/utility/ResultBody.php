<?php
declare(strict_types=1);

// NovayaGazeta SDK utility: result_body

class NovayaGazetaResultBody
{
    public static function call(NovayaGazetaContext $ctx): ?NovayaGazetaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
