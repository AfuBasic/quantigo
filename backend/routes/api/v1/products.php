<?php

use App\Http\Controllers\Api\V1\Products\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('products', ProductController::class);
