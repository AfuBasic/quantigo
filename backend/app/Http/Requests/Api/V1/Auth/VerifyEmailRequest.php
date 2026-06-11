<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyEmailRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Simple authorization for demonstration.
        // Usually handled via signed routes in Laravel.
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'integer'],
            'hash' => ['required', 'string'],
        ];
    }
}
