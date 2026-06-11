<?php

namespace App\Notifications\Auth;

use App\Mail\Auth\VerifyEmailMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class VerifyEmailNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public string $verifyUrl) {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new VerifyEmailMail($notifiable->name, $this->verifyUrl))
            ->to($notifiable->email);
    }
}
