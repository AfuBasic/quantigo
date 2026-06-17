<?php

namespace App\Domains\Merchants\Actions;

use App\Models\MerchantProfile;
use App\Models\MerchantVerificationHistory;
use Illuminate\Support\Facades\DB;

class ChangeMerchantVerificationStatusAction
{
    public static function execute(
        MerchantProfile $merchant,
        string $newStatus,
        ?string $actorType = null,
        ?int $actorId = null,
        ?string $notes = null,
        ?array $requestedInformation = null
    ): MerchantProfile {
        return DB::transaction(function () use ($merchant, $newStatus, $actorType, $actorId, $notes, $requestedInformation) {
            $oldStatus = $merchant->verification_status;

            // Prepare updates based on status
            $updates = [
                'verification_status' => $newStatus,
            ];

            if ($newStatus === 'under_review') {
                $updates['reviewer_id'] = $actorId;
                if (!$merchant->review_started_at) {
                    $updates['review_started_at'] = now();
                }
            }

            if (in_array($newStatus, ['approved', 'rejected'])) {
                $updates['review_completed_at'] = now();
            }

            if ($newStatus === 'rejected') {
                $updates['rejection_reason'] = $notes;
            }

            if ($newStatus === 'additional_information_requested') {
                $updates['requested_information'] = $requestedInformation;
            }

            if ($notes && in_array($actorType, ['admin', 'system'])) {
                $updates['internal_notes'] = $notes;
            }

            // Update Merchant Profile
            $merchant->update($updates);

            // Record History
            MerchantVerificationHistory::create([
                'merchant_profile_id' => $merchant->id,
                'status_from' => $oldStatus,
                'status_to' => $newStatus,
                'actor_type' => $actorType,
                'actor_id' => $actorId,
                'notes' => $notes,
            ]);

            // Dispatch Notifications
            if ($oldStatus !== $newStatus && in_array($newStatus, ['under_review', 'additional_information_requested', 'approved', 'rejected'])) {
                $merchant->user->notify(new \App\Notifications\VerificationStatusChangedNotification($merchant, $newStatus));
            }

            return $merchant;
        });
    }
}
