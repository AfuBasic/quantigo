<?php

namespace App\Policies;

use App\Models\User;

class PoolPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, mixed $pool): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, mixed $pool): bool
    {
        return true;
    }

    public function delete(User $user, mixed $pool): bool
    {
        return true;
    }
}
