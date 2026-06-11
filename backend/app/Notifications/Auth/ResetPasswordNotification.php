<?php

namespace App\Notifications\Auth;

use App\Mail\Auth\ResetPasswordMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public string $token) {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // Construct the frontend reset URL
        $resetUrl = config('app.frontend_url', 'http://localhost:5173') . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new ResetPasswordMail($notifiable->name, $resetUrl))
            ->to($notifiable->email);
    }
}
