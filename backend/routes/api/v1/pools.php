<?php

use App\Http\Controllers\Api\V1\Pools\PoolController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('pools', PoolController::class);
