<?php

namespace App\Domains\Auth\Listeners;

use App\Domains\Auth\Events\MerchantRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendVerificationEmail implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(MerchantRegistered $event): void
    {
        // For now, log the email since emails are not configured.
        // A Mailable would be sent here.
        Log::info("Dispatching Verification Email to: {$event->user->email}");
        
        $event->user->sendEmailVerificationNotification();
    }
}
