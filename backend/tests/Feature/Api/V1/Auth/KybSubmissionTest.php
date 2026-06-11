<?php

namespace Tests\Feature\Api\V1\Auth;

use App\Models\User;
use App\Models\UploadedAsset;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KybSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_upload_signature()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/v1/auth/kyb/signature');

        $response->assertStatus(200)
            ->assertJsonStructure(['signature', 'timestamp', 'api_key', 'cloud_name', 'folder']);
    }

    public function test_user_can_check_asset_hash()
    {
        $user = User::factory()->create();
        
        $hash = str_repeat('a', 64);
        
        // Caching doesn't exist yet
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/kyb/check-hash', ['hash' => $hash]);

        $response->assertStatus(200)
            ->assertJson(['exists' => false]);

        // Register the asset
        UploadedAsset::create([
            'file_hash' => $hash,
            'url' => 'https://res.cloudinary.com/test-url',
        ]);

        // Query again
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/kyb/check-hash', ['hash' => $hash]);

        $response->assertStatus(200)
            ->assertJson([
                'exists' => true,
                'url' => 'https://res.cloudinary.com/test-url',
            ]);
    }

    public function test_user_can_submit_kyb_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/v1/auth/kyb', [
                'business_name' => 'Test Pharmacy Ltd',
                'registration_type' => 'limited_liability',
                'registration_number' => 'RC-9988223',
                'business_address' => '12 Lagos Way',
                'business_phone' => '+2348012345678',
                'cac_certificate_path' => 'https://res.cloudinary.com/cert.pdf',
                'cac_status_report_path' => 'https://res.cloudinary.com/report.pdf',
                'proof_of_address_path' => 'https://res.cloudinary.com/proof.jpg',
                'director_name' => 'Director John',
                'director_phone' => '+2348099887766',
                'director_bvn' => '12345678901',
                'director_nin' => '98765432101',
                'director_identity_path' => 'https://res.cloudinary.com/director.jpg',
            ]);

        $response->assertStatus(202)
            ->assertJsonPath('user.merchant_profile.business_name', 'Test Pharmacy Ltd')
            ->assertJsonPath('user.merchant_profile.verification_status', 'pending');

        $this->assertDatabaseHas('merchant_profiles', [
            'user_id' => $user->id,
            'business_name' => 'Test Pharmacy Ltd',
            'registration_number' => 'RC-9988223',
            'director_phone' => '+2348099887766',
        ]);
    }
}
