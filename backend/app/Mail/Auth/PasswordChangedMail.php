<?php

namespace App\Mail\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChangedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $timestamp,
        public string $supportUrl
    ) {}

    public function build()
    {
        return $this->subject('Password changed successfully - Quantigo')
            ->view('emails.auth.password-changed');
    }
}
