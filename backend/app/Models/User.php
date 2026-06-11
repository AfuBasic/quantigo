<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Notifications\Auth\VerifyEmailNotification;
use App\Notifications\Auth\ResetPasswordNotification;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendEmailVerificationNotification()
    {
        $frontendUrl = rtrim(config('app.frontend_url'), '/');

        $url = $frontendUrl . '/verify-email?' . http_build_query([
            'id' => $this->getKey(),
            'hash' => sha1($this->getEmailForVerification()),
        ]);

        $this->notify(new VerifyEmailNotification($url));
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function merchantProfile(): HasOne
    {
        return $this->hasOne(MerchantProfile::class);
    }
}
