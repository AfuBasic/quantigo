<?php

namespace App\Domains\Auth\Actions;

use App\Domains\Auth\DTOs\LoginData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginAction
{
    public static function execute(LoginData $data): User
    {
        $user = User::where('email', $data->email)->first();

        if (! $user || ! Hash::check($data->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        return $user;
    }
}
