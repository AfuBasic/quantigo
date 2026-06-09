<?php

use App\Http\Controllers\Api\V1\Payments\PaymentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('payments', PaymentController::class);
