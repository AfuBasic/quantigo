<?php

namespace App\Http\Requests\Api\V1\Pools;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePoolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}
