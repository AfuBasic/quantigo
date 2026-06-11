<?php

namespace App\Domains\Auth\Actions;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\ValidationException;

class VerifyEmailAction
{
    public static function execute(int $userId, string $hash): void
    {
        $user = User::findOrFail($userId);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            throw ValidationException::withMessages([
                'hash' => ['Invalid verification link.'],
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            return;
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }
    }
}
