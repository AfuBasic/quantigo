<?php

namespace App\Domains\Auth\DTOs;

use App\Http\Requests\Api\V1\Auth\ForgotPasswordRequest;

readonly class ForgotPasswordData
{
    public function __construct(
        public string $email,
    ) {
    }

    public static function fromRequest(ForgotPasswordRequest $request): self
    {
        return new self(
            email: $request->validated('email'),
        );
    }
}
