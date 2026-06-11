<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Quantigo API',
        'version' => 'v1',
        'status' => 'operational',
        'documentation' => url('/api/v1'),
        'admin' => url('/admin'),
    ]);
});
