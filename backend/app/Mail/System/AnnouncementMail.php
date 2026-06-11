<?php

namespace App\Mail\System;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AnnouncementMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $title,
        public string $body,
        public ?string $actionUrl = null,
        public ?string $actionText = null
    ) {}

    public function build()
    {
        return $this->subject($this->title . ' - Quantigo Update')
            ->view('emails.system.announcement');
    }
}
