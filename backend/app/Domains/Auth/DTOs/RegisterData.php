<?php

namespace App\Domains\Auth\DTOs;

use App\Http\Requests\Api\V1\Auth\RegisterRequest;

readonly class RegisterData
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {
    }

    public static function fromRequest(RegisterRequest $request): self
    {
        return new self(
            name: $request->validated('name'),
            email: $request->validated('email'),
            password: $request->validated('password'),
        );
    }
}
