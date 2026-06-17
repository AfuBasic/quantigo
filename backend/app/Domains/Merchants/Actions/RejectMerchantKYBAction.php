<?php

namespace App\Domains\Merchants\Actions;

use App\Models\MerchantProfile;
use Illuminate\Support\Facades\DB;

class RejectMerchantKYBAction
{
    public static function execute(MerchantProfile $merchant, string $reason): MerchantProfile
    {
        return DB::transaction(function () use ($merchant, $reason) {
            $merchant->update([
                'verification_status' => 'rejected',
                'verification_notes' => $reason,
            ]);

            // Optional: Dispatch event like MerchantRejectedEvent::dispatch($merchant);

            return $merchant;
        });
    }
}
