<?php

use App\Http\Controllers\Admin\Auth\LogoutController;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::middleware('guest:admin')->group(function () {
    Volt::route('login', 'admin.auth.login')->name('login');
    Volt::route('forgot-password', 'admin.auth.forgot-password')->name('password.request');
    Volt::route('reset-password/{token}', 'admin.auth.reset-password')->name('password.reset');
});

Route::middleware(['auth:admin'])->group(function () {
    Volt::route('2fa/setup', 'admin.auth.2fa-setup')->name('2fa.setup');
    Volt::route('2fa/challenge', 'admin.auth.2fa-challenge')->name('2fa.challenge');
    Route::post('logout', LogoutController::class)->name('logout');
});
