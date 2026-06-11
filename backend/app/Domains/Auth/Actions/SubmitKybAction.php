<?php

namespace App\Domains\Auth\Actions;

use App\Models\User;
use App\Models\MerchantProfile;

class SubmitKybAction
{
    public static function execute(User $user, array $data): MerchantProfile
    {
        return MerchantProfile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($data, [
                'verification_status' => 'pending',
                'verification_notes' => null,
            ])
        );
    }
}
