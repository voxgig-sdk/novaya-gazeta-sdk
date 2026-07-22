<?php
declare(strict_types=1);

// NovayaGazeta SDK utility: result_headers

class NovayaGazetaResultHeaders
{
    public static function call(NovayaGazetaContext $ctx): ?NovayaGazetaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
