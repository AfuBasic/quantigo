<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified' => $this->hasVerifiedEmail(),
            'merchant_profile' => $this->merchantProfile ? [
                'business_name' => $this->merchantProfile->business_name,
                'registration_type' => $this->merchantProfile->registration_type,
                'registration_number' => $this->merchantProfile->registration_number,
                'business_address' => $this->merchantProfile->business_address,
                'business_phone' => $this->merchantProfile->business_phone,
                'cac_certificate_path' => $this->merchantProfile->cac_certificate_path,
                'cac_status_report_path' => $this->merchantProfile->cac_status_report_path,
                'proof_of_address_path' => $this->merchantProfile->proof_of_address_path,
                'director_name' => $this->merchantProfile->director_name,
                'director_phone' => $this->merchantProfile->director_phone,
                'director_bvn' => $this->merchantProfile->director_bvn,
                'director_nin' => $this->merchantProfile->director_nin,
                'director_identity_path' => $this->merchantProfile->director_identity_path,
                'verification_status' => $this->merchantProfile->verification_status,
                'verification_notes' => $this->merchantProfile->verification_notes,
            ] : null,
        ];
    }
}
