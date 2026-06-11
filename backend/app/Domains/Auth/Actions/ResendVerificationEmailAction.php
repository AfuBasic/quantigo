<?php

namespace App\Domains\Auth\Actions;

use App\Domains\Auth\Events\MerchantRegistered;
use App\Models\User;

class ResendVerificationEmailAction
{
    public static function execute(User $user): void
    {
        if ($user->hasVerifiedEmail()) {
            return;
        }

        // We can reuse the MerchantRegistered event or create a specific ResendVerification event
        MerchantRegistered::dispatch($user);
    }
}
