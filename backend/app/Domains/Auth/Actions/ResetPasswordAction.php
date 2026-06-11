<?php

namespace App\Domains\Auth\Actions;

use App\Domains\Auth\DTOs\ResetPasswordData;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ResetPasswordAction
{
    public static function execute(ResetPasswordData $data): void
    {
        $status = Password::reset(
            ['email' => $data->email, 'password' => $data->password, 'password_confirmation' => $data->password, 'token' => $data->token],
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
    }
}
