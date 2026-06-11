<?php

namespace App\Domains\Auth\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MerchantRegistered
{
    use Dispatchable, SerializesModels;

    public function __construct(public User $user)
    {
    }
}
