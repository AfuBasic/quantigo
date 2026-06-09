<?php

namespace App\Policies;

use App\Models\User;

class NotificationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, mixed $notification): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, mixed $notification): bool
    {
        return true;
    }

    public function delete(User $user, mixed $notification): bool
    {
        return true;
    }
}
