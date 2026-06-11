<?php

namespace App\Mail\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PickupReadyMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $poolName,
        public string $locationName,
        public string $locationAddress,
        public string $dashboardUrl
    ) {}

    public function build()
    {
        return $this->subject('Action Required: Inventory ready for pickup - Quantigo')
            ->view('emails.notifications.pickup-ready');
    }
}
