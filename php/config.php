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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                  'parts' => [
                    'get',
                    'slugs',
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
                  'parts' => [
                    'get',
                    'themes',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
