# statamic-bard-text-styles

![Statamic v3](https://img.shields.io/badge/Statamic-3.0+-FF269E)
[![Packagist](https://img.shields.io/packagist/v/21stdigital/statamic-bard-text-styles)](https://)
![Test Suite](https://github.com/21stdigital/statamic-bard-text-styles/workflows/Tests/badge.svg)

This addon for Statamic allows you to select custom paragraph styles in the bard editor.

## Installation

Via Composer

```bash
$ composer require tfd/statamic-bard-text-styles
```

## Configuration

Publish the configuration:

```bash
$ php please vendor:publish --tag=bard-custom-text-styles
```

Open config/bard-custom-text-styles.php and add your custom paragraph styles:

```php
return [
    'text-copy-secondary' => [
        'title' => 'text copy secondary',
        'class' => 'text-copy-secondary',
        'style' => 'font-size: 14px; color: grey;',
    ],
];
```

Each style must use:

- **title**: The name of the style, shown in the bard select menu.
- **class**: The class name, that will be added to the paragraph in the frontend.
- **style**b: The inline style, that is only applied in the bard editor itself, not the frontend.

## Statamic Resources

- [Statamic 3 Docs](https://statamic.dev)
- [Statamic Discord](https://statamic.com/discord)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Development

- run `npm run watch` to develop
