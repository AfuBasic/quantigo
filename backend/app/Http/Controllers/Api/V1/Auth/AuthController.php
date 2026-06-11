<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Domains\Auth\Actions\LoginAction;
use App\Domains\Auth\Actions\RegisterAction;
use App\Domains\Auth\Actions\ResendVerificationEmailAction;
use App\Domains\Auth\Actions\ResetPasswordAction;
use App\Domains\Auth\Actions\SendPasswordResetLinkAction;
use App\Domains\Auth\Actions\VerifyEmailAction;
use App\Domains\Auth\DTOs\ForgotPasswordData;
use App\Domains\Auth\DTOs\LoginData;
use App\Domains\Auth\DTOs\RegisterData;
use App\Domains\Auth\DTOs\ResetPasswordData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\ForgotPasswordRequest;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Requests\Api\V1\Auth\ResetPasswordRequest;
use App\Http\Requests\Api\V1\Auth\VerifyEmailRequest;
use App\Domains\Auth\Actions\GenerateUploadSignatureAction;
use App\Domains\Auth\Actions\SubmitKybAction;
use App\Domains\Auth\Actions\CheckAssetHashAction;
use App\Domains\Auth\Actions\RegisterAssetAction;
use App\Http\Requests\Api\V1\Auth\SubmitKybRequest;
use App\Http\Resources\Api\V1\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Authentication
 *
 * Endpoints for managing merchant authentication, registration, password resets, and email verification.
 */
class AuthController extends Controller
{
    /**
     * Register a new merchant
     *
     * Create a new merchant account and trigger email verification.
     *
     * @unauthenticated
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = RegisterAction::execute(
            RegisterData::fromRequest($request)
        );

        return response()->json([
            'message' => 'Registration successful. Please check your email to verify your account.',
            'user' => new UserResource($user),
            'token' => $user->createToken('merchant-api')->plainTextToken,
        ], 201);
    }

    /**
     * Log in a merchant
     *
     * Authenticate a merchant and retrieve an API token.
     *
     * @unauthenticated
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = LoginAction::execute(
            LoginData::fromRequest($request)
        );

        return response()->json([
            'user' => new UserResource($user),
            'token' => $user->createToken('merchant-api')->plainTextToken,
        ]);
    }

    /**
     * Request password reset link
     *
     * Send an email with a secure link to reset the password.
     *
     * @unauthenticated
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        SendPasswordResetLinkAction::execute(
            ForgotPasswordData::fromRequest($request)
        );

        return response()->json([
            'message' => 'If that email address exists, a password reset link has been sent.',
        ]);
    }

    /**
     * Reset password
     *
     * Update the account password using the token sent in the reset link.
     *
     * @unauthenticated
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        ResetPasswordAction::execute(
            ResetPasswordData::fromRequest($request)
        );

        return response()->json([
            'message' => 'Password has been successfully reset.',
        ]);
    }

    /**
     * Verify email address
     *
     * Mark the merchant's email address as verified using the signed URL parameters.
     *
     * @unauthenticated
     */
    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        VerifyEmailAction::execute(
            $request->validated('id'),
            $request->validated('hash')
        );

        return response()->json([
            'message' => 'Email verified successfully.',
        ]);
    }

    /**
     * Resend verification email
     *
     * Request a new verification email for the currently authenticated merchant.
     *
     * @authenticated
     */
    public function resendVerificationEmail(Request $request): JsonResponse
    {
        ResendVerificationEmailAction::execute($request->user());

        return response()->json([
            'message' => 'Verification email resent.',
        ]);
    }

    /**
     * Get profile
     *
     * Retrieve the profile details of the authenticated merchant.
     *
     * @authenticated
     */
    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    /**
     * Log out
     *
     * Revoke the current access token.
     *
     * @authenticated
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out.']);
    }

    /**
     * Get Cloudinary upload signature
     *
     * Generate a signed signature for secure direct browser uploads to Cloudinary.
     *
     * @authenticated
     */
    public function getUploadSignature(Request $request): JsonResponse
    {
        $signatureData = GenerateUploadSignatureAction::execute('kyb_documents');
        return response()->json($signatureData);
    }

    /**
     * Submit KYB profile
     *
     * Submit compliance registry details and Cloudinary secure document URLs for review.
     *
     * @authenticated
     */
    public function submitKyb(SubmitKybRequest $request): JsonResponse
    {
        $profile = SubmitKybAction::execute(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'KYB documentation submitted successfully.',
            'user' => new UserResource($request->user()->fresh()),
        ], 202);
    }

    /**
     * Check asset hash
     *
     * Check if a file content hash already exists in our local registry to bypass uploading again.
     *
     * @authenticated
     */
    public function checkAssetHash(Request $request): JsonResponse
    {
        $request->validate(['hash' => ['required', 'string', 'size:64']]);
        
        $asset = CheckAssetHashAction::execute($request->input('hash'));

        if ($asset) {
            return response()->json([
                'exists' => true,
                'url' => $asset->url,
            ]);
        }

        return response()->json(['exists' => false]);
    }

    /**
     * Register uploaded asset
     *
     * Store an asset hash and secure URL in our local registry for future deduplication.
     *
     * @authenticated
     */
    public function registerAsset(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file_hash' => ['required', 'string', 'size:64', 'unique:uploaded_assets,file_hash'],
            'url' => ['required', 'string', 'url'],
            'file_name' => ['nullable', 'string', 'max:255'],
            'file_size' => ['nullable', 'integer'],
            'mime_type' => ['nullable', 'string', 'max:100'],
        ]);

        $asset = RegisterAssetAction::execute($data);
 
         return response()->json([
             'message' => 'Asset registered successfully.',
             'asset' => $asset,
         ], 201);
     }
 
     /**
      * Verify BVN (Mock)
      *
      * Verify a BVN number and return the director name entered to simulate API matching.
      *
      * @authenticated
      */
     public function verifyBvn(Request $request): JsonResponse
     {
         $request->validate([
             'bvn' => ['required', 'string', 'size:11'],
             'director_name' => ['nullable', 'string', 'max:255'],
         ]);
 
         return response()->json([
             'status' => 'success',
             'name' => $request->input('director_name') ?: 'John Doe',
         ]);
     }
 }
