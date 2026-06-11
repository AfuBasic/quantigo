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
        Event::listen(
            MerchantRegistered::class,
            SendVerificationEmail::class,
        );

        Event::listen(
            PasswordResetRequested::class,
            SendPasswordResetEmail::class,
        );

        VerifyEmail::createUrlUsing(function ($notifiable) {
            return URL::temporarySignedRoute(
                'api.v1.auth.verification.verify',
                now()->addMinutes(config('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );
        });
    }
}
