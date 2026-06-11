<?php

namespace App\Mail\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirmedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $poolName,
        public string $productName,
        public float $amount,
        public string $procurementStatus,
        public string $dashboardUrl
    ) {}

    public function build()
    {
        return $this->subject('Payment Receipt: Confirmed contribution - Quantigo')
            ->view('emails.notifications.payment-confirmed');
    }
}
