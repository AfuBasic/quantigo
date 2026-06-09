<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')
    ->as('api.v1.')
    ->group(function (): void {
        require __DIR__.'/api/v1/auth.php';
        require __DIR__.'/api/v1/merchants.php';
        require __DIR__.'/api/v1/products.php';
        require __DIR__.'/api/v1/pools.php';
        require __DIR__.'/api/v1/orders.php';
        require __DIR__.'/api/v1/payments.php';
        require __DIR__.'/api/v1/notifications.php';
    });
