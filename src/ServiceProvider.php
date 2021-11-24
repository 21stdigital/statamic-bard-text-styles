<?php

namespace TFD\StatamicBardTextStyles;

use Statamic\Statamic;
use Illuminate\Support\Facades\View;
use Statamic\Fieldtypes\Bard\Augmentor;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__ . '/../public/js/textstyles.js',
    ];
    
    public function boot()
    {
        parent::boot();

        $this->publishes([
            __DIR__.'/../config/bard-custom-text-styles.php' => config_path('bard-custom-text-styles.php'),
        ], 'bard-custom-text-styles');
        
        Statamic::provideToScript([
            'bard-custom-text-styles' => config('bard-custom-text-styles', config('bard-custom-text-styles')),
        ]);

        Augmentor::addNode(TextStyle::class);
    }
}
