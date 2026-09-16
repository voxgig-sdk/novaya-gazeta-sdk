<?php
declare(strict_types=1);

// NovayaGazeta SDK configuration

class NovayaGazetaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NovayaGazeta",
                "slug" => "novaya-gazeta",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://novayagazeta.eu/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "article" => [],
                    "theme" => [],
                ],
            ],
            "entity" => [
        'article' => [
          'fields' => [
            [
              'name' => 'author',
              'short' => 'Article author',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'short' => 'Article category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'content',
              'short' => 'Article content',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'publishedDate',
              'short' => 'Publication date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'short' => 'Article slug',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'short' => 'Article tags',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'short' => 'Article title',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'article',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'eu',
                        'orig' => 'eu',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'slug',
                        'orig' => 'slug',
                        'reqd' => true,
                        'type' => '`$ARRAY`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/get/slugs',
                  'segments' => [
                    [
                      'lit' => 'get',
                    ],
                    [
                      'lit' => 'slugs',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'eu',
                      'slug',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'get',
                    'slugs',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'theme' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Theme description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Theme identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Theme name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'short' => 'URL slug for the theme',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'theme',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/get/themes',
                  'segments' => [
                    [
                      'lit' => 'get',
                    ],
                    [
                      'lit' => 'themes',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'get',
                    'themes',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NovayaGazetaFeatures::make_feature($name);
    }
}
