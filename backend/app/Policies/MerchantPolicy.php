<?php

namespace App\Policies;

use App\Models\User;

class MerchantPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, mixed $merchant): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, mixed $merchant): bool
    {
        return true;
    }

    public function delete(User $user, mixed $merchant): bool
    {
        return true;
    }
}
