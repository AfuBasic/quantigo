<?php

use App\Http\Controllers\Api\V1\Merchants\MerchantController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('merchants', MerchantController::class);

    // Business Verification Workflow
    Route::prefix('business-verification')->group(function () {
        Route::get('/status', [\App\Http\Controllers\Api\V1\Merchants\VerificationController::class, 'status']);
        Route::get('/history', [\App\Http\Controllers\Api\V1\Merchants\VerificationController::class, 'history']);
        Route::post('/submit', [\App\Http\Controllers\Api\V1\Merchants\VerificationController::class, 'submit']);
        Route::post('/resubmit', [\App\Http\Controllers\Api\V1\Merchants\VerificationController::class, 'resubmit']);
        Route::post('/documents', [\App\Http\Controllers\Api\V1\Merchants\VerificationController::class, 'documents']);
    });
});
