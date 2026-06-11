<?php

namespace App\Domains\Auth\DTOs;

use App\Http\Requests\Api\V1\Auth\ResetPasswordRequest;

readonly class ResetPasswordData
{
    public function __construct(
        public string $token,
        public string $email,
        public string $password,
    ) {
    }

    public static function fromRequest(ResetPasswordRequest $request): self
    {
        return new self(
            token: $request->validated('token'),
            email: $request->validated('email'),
            password: $request->validated('password'),
        );
    }
}
