<?php

namespace App\Domains\Auth\Actions;

use App\Domains\Auth\DTOs\ForgotPasswordData;
use App\Domains\Auth\Events\PasswordResetRequested;
use App\Models\User;
use Illuminate\Support\Facades\Password;

class SendPasswordResetLinkAction
{
    public static function execute(ForgotPasswordData $data): void
    {
        $user = User::where('email', $data->email)->first();

        if ($user) {
            $token = Password::getRepository()->create($user);
            PasswordResetRequested::dispatch($user, $token);
        }
    }
}
