<?php

namespace App\Domains\Auth\Actions;

use App\Domains\Auth\DTOs\RegisterData;
use App\Domains\Auth\Events\MerchantRegistered;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterAction
{
    public static function execute(RegisterData $data): User
    {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        MerchantRegistered::dispatch($user);

        return $user;
    }
}
