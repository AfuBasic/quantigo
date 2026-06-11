<?php

namespace App\Mail\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProcurementUpdateMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $poolName,
        public string $updateTitle,
        public string $updateDescription,
        public string $dashboardUrl
    ) {}

    public function build()
    {
        return $this->subject('Procurement Progress Update - Quantigo')
            ->view('emails.notifications.procurement-update');
    }
}
