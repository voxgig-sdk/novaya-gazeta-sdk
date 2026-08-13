<?php
declare(strict_types=1);

// NovayaGazeta SDK configuration

class NovayaGazetaConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NovayaGazeta",
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
              'active' => true,
              'name' => 'author',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'category',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'content',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'publishedDate',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'tags',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'title',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
          ],
          'name' => 'article',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'eu',
                        'orig' => 'eu',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'theme' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'description',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'theme',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
