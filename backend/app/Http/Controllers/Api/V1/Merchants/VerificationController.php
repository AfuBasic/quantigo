<?php

namespace App\Http\Controllers\Api\V1\Merchants;

use App\Http\Controllers\Controller;
use App\Models\MerchantProfile;
use App\Domains\Merchants\Actions\ChangeMerchantVerificationStatusAction;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /**
     * Get the current verification status, requested info, and profile details.
     */
    public function status(Request $request)
    {
        $profile = MerchantProfile::where('user_id', $request->user()->id)->first();
        
        if (!$profile) {
            return response()->json([
                'data' => [
                    'verification_status' => 'unsubmitted'
                ]
            ]);
        }

        return response()->json([
            'data' => $profile
        ]);
    }

    /**
     * Get the timeline of verification history.
     */
    public function history(Request $request)
    {
        $profile = MerchantProfile::where('user_id', $request->user()->id)->firstOrFail();
        
        $history = $profile->history()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $history
        ]);
    }

    /**
     * Submit verification for the first time.
     */
    public function submit(Request $request)
    {
        $profile = MerchantProfile::where('user_id', $request->user()->id)->firstOrFail();
        
        ChangeMerchantVerificationStatusAction::execute(
            merchant: $profile,
            newStatus: 'submitted',
            actorType: 'merchant',
            actorId: $request->user()->id,
            notes: 'Initial submission'
        );

        return response()->json([
            'message' => 'Verification submitted successfully.',
            'data' => $profile->fresh()
        ]);
    }

    /**
     * Resubmit after additional information was requested.
     */
    public function resubmit(Request $request)
    {
        $profile = MerchantProfile::where('user_id', $request->user()->id)->firstOrFail();
        
        ChangeMerchantVerificationStatusAction::execute(
            merchant: $profile,
            newStatus: 'resubmitted',
            actorType: 'merchant',
            actorId: $request->user()->id,
            notes: $request->input('notes', 'Merchant resubmitted requested information')
        );

        return response()->json([
            'message' => 'Verification resubmitted successfully.',
            'data' => $profile->fresh()
        ]);
    }

    /**
     * Upload or replace specific verification documents.
     */
    public function documents(Request $request)
    {
        $request->validate([
            'document_type' => 'required|in:cac_certificate,cac_status_report,proof_of_address,director_identity',
            'document_url' => 'required|url', // Assuming Cloudinary upload happens on client, or we receive path
        ]);

        $profile = MerchantProfile::where('user_id', $request->user()->id)->firstOrFail();
        
        $field = $request->document_type . '_path';
        $profile->update([
            $field => $request->document_url
        ]);

        // Log the document update
        $profile->history()->create([
            'status_from' => $profile->verification_status,
            'status_to' => $profile->verification_status,
            'actor_type' => 'merchant',
            'actor_id' => $request->user()->id,
            'notes' => "Uploaded new {$request->document_type}",
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully.',
            'data' => $profile->fresh()
        ]);
    }
}
