<?php
declare(strict_types=1);

// NovayaGazeta SDK base feature

class NovayaGazetaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NovayaGazetaContext $ctx, array $options): void {}
    public function PostConstruct(NovayaGazetaContext $ctx): void {}
    public function PostConstructEntity(NovayaGazetaContext $ctx): void {}
    public function SetData(NovayaGazetaContext $ctx): void {}
    public function GetData(NovayaGazetaContext $ctx): void {}
    public function GetMatch(NovayaGazetaContext $ctx): void {}
    public function SetMatch(NovayaGazetaContext $ctx): void {}
    public function PrePoint(NovayaGazetaContext $ctx): void {}
    public function PreSpec(NovayaGazetaContext $ctx): void {}
    public function PreRequest(NovayaGazetaContext $ctx): void {}
    public function PreResponse(NovayaGazetaContext $ctx): void {}
    public function PreResult(NovayaGazetaContext $ctx): void {}
    public function PreDone(NovayaGazetaContext $ctx): void {}
    public function PreUnexpected(NovayaGazetaContext $ctx): void {}
}
