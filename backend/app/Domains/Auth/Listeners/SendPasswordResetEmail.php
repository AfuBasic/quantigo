<?php

namespace App\Domains\Auth\Listeners;

use App\Domains\Auth\Events\PasswordResetRequested;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendPasswordResetEmail implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(PasswordResetRequested $event): void
    {
        // For now, log the email since emails are not configured.
        Log::info("Dispatching Password Reset Email to: {$event->user->email} with token: {$event->token}");
        
        // Let Laravel handle sending the default password reset notification, 
        // or trigger a custom Mailable. The default notification leverages the broker.
        $event->user->sendPasswordResetNotification($event->token);
    }
}
