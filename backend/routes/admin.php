<?php

use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::middleware(['2fa.admin'])->group(function (): void {
    Volt::route('/', 'admin.dashboard')->name('dashboard');
    Volt::route('/merchants', 'admin.merchants')->name('merchants');
    Volt::route('/suppliers', 'admin.suppliers')->name('suppliers');
    Volt::route('/products', 'admin.products')->name('products');
    Volt::route('/procurement-pools', 'admin.procurement-pools')->name('procurement-pools');
    Volt::route('/payments', 'admin.payments')->name('payments');
    Volt::route('/procurement-operations', 'admin.procurement-operations')->name('procurement-operations');
    Volt::route('/fulfillment', 'admin.fulfillment')->name('fulfillment');
    Volt::route('/notifications', 'admin.notifications')->name('notifications');
    Volt::route('/reports', 'admin.reports')->name('reports');
});
