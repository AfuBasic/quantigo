<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubmitKybRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'business_name' => ['required', 'string', 'max:255'],
            'registration_type' => ['required', 'string', 'in:sole_proprietorship,limited_liability,cooperative'],
            'registration_number' => ['required', 'string', 'max:255'],
            'business_address' => ['required', 'string'],
            'business_phone' => ['required', 'string', 'max:20'],
            
            // Cloudinary Secure URL Paths
            'cac_certificate_path' => ['required', 'string', 'url'],
            'cac_status_report_path' => ['required', 'string', 'url'],
            'proof_of_address_path' => ['required', 'string', 'url'],
            
            // Director Identity Details
            'director_name' => ['required', 'string', 'max:255'],
            'director_phone' => ['required', 'string', 'max:20'],
            'director_bvn' => ['required', 'string', 'size:11'],
            'director_nin' => ['required', 'string', 'size:11'],
            'director_identity_path' => ['required', 'string', 'url'],
        ];
    }
}
