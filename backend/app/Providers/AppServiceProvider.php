<?php

namespace App\Providers;

use App\Domains\Auth\Events\MerchantRegistered;
use App\Domains\Auth\Events\PasswordResetRequested;
use App\Domains\Auth\Listeners\SendPasswordResetEmail;
use App\Domains\Auth\Listeners\SendVerificationEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Livewire\Volt\Volt;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.url')) {
            URL::forceRootUrl(config('app.url'));
        }

        Volt::mount([
            resource_path('views/livewire'),
            resource_path('views/pages'),
        ]);

        Event::listen(
            MerchantRegistered::class,
            SendVerificationEmail::class,
        );

        Event::listen(
            PasswordResetRequested::class,
            SendPasswordResetEmail::class,
        );

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $frontendUrl = config('app.frontend_url');

            $backendUrl = URL::temporarySignedRoute(
                'api.v1.auth.verification.verify',
                now()->addMinutes(config('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            $query = parse_url($backendUrl, PHP_URL_QUERY);

            return rtrim($frontendUrl, '/') . '/verify-email?' . $query;
        });
    }
}
