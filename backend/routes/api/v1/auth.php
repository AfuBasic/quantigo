<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register'])->name('register')->middleware('throttle:5,1');
    Route::post('/login', [AuthController::class, 'login'])->name('login')->middleware('throttle:5,1');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email')->middleware('throttle:3,1');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update')->middleware('throttle:5,1');
    Route::post('/verify-email', [AuthController::class, 'verifyEmail'])->name('verification.verify');

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/me', [AuthController::class, 'me'])->name('me');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('/email/verification-notification', [AuthController::class, 'resendVerificationEmail'])
            ->name('verification.send')
            ->middleware('throttle:3,1');
        Route::get('/kyb/signature', [AuthController::class, 'getUploadSignature'])->name('kyb.signature');
        Route::post('/kyb', [AuthController::class, 'submitKyb'])->name('kyb.submit');
        Route::post('/kyb/bvn-verify', [AuthController::class, 'verifyBvn'])->name('kyb.bvn-verify');
        Route::post('/kyb/check-hash', [AuthController::class, 'checkAssetHash'])->name('kyb.check-hash');
        Route::post('/kyb/register-asset', [AuthController::class, 'registerAsset'])->name('kyb.register-asset');
    });
});
