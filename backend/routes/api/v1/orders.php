<?php

use App\Http\Controllers\Api\V1\Orders\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('orders', OrderController::class);
