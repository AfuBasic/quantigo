<?php

namespace App\Domains\Merchants\Actions;

use App\Models\MerchantProfile;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;

class ApproveMerchantKYBAction
{
    public static function execute(MerchantProfile $merchant, ?string $notes = null): MerchantProfile
    {
        return DB::transaction(function () use ($merchant, $notes) {
            $merchant->update([
                'verification_status' => 'approved',
                'verification_notes' => $notes,
            ]);

            // Optional: Dispatch event like MerchantApprovedEvent::dispatch($merchant);
            
            // Assuming AuditLog exists and is used like this, otherwise comment out
            // AuditLog::create([
            //     'action' => 'merchant_approved',
            //     'target_type' => MerchantProfile::class,
            //     'target_id' => $merchant->id,
            //     'user_id' => auth('admin')->id(),
            // ]);

            return $merchant;
        });
    }
}
