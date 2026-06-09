<?php

use App\Http\Controllers\Api\V1\Merchants\MerchantController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('merchants', MerchantController::class);
