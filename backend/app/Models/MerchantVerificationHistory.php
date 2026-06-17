<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MerchantVerificationHistory extends Model
{
    protected $fillable = [
        'merchant_profile_id',
        'status_from',
        'status_to',
        'actor_type',
        'actor_id',
        'notes',
    ];

    public function merchantProfile()
    {
        return $this->belongsTo(MerchantProfile::class);
    }
}
