<?php

namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginAlertMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $time,
        public string $ip,
        public string $userAgent,
        public string $resetUrl
    ) {}

    public function build()
    {
        return $this->subject('Security Alert: New login detected - Quantigo')
            ->view('emails.auth.login-alert');
    }
}
