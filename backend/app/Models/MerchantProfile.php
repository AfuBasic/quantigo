<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MerchantProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'registration_type',
        'registration_number',
        'business_address',
        'business_phone',
        'cac_certificate_path',
        'cac_status_report_path',
        'proof_of_address_path',
        'director_name',
        'director_phone',
        'director_bvn',
        'director_nin',
        'director_identity_path',
        'verification_status',
        'verification_notes',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
