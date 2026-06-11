<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Facades\Auth;

new #[Layout('components.layouts.admin-guest')] class extends Component {
    public string $code = '';
    public bool $useRecoveryCode = false;

    public function verify()
    {
        $this->validate(['code' => 'required']);

        $admin = Auth::guard('admin')->user();
        
        if ($this->useRecoveryCode) {
            $recoveryCodes = json_decode(decrypt($admin->two_factor_recovery_codes), true) ?? [];
            
            if (in_array($this->code, $recoveryCodes)) {
                // Remove used recovery code
                $recoveryCodes = array_diff($recoveryCodes, [$this->code]);
                $admin->two_factor_recovery_codes = encrypt(json_encode(array_values($recoveryCodes)));
                $admin->save();
                
                session()->put('admin_2fa_passed', true);
                return redirect()->intended(route('admin.dashboard'));
            }
            
            $this->addError('code', 'The recovery code is invalid or has already been used.');
            return;
        }

        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey($admin->two_factor_secret, $this->code);

        if ($valid) {
            session()->put('admin_2fa_passed', true);
            return redirect()->intended(route('admin.dashboard'));
        }

        $this->addError('code', 'The provided two factor authentication code was invalid.');
    }

    public function toggleRecovery()
    {
        $this->useRecoveryCode = !$this->useRecoveryCode;
        $this->code = '';
        $this->resetErrorBag();
    }
}; ?>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
        <div>
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Two-Factor Authentication
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                {{ $useRecoveryCode ? 'Please enter one of your emergency recovery codes.' : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.' }}
            </p>
        </div>

        <form wire:submit="verify" class="space-y-6 mt-8">
            <div>
                <label for="code" class="block text-sm font-medium text-gray-700">
                    {{ $useRecoveryCode ? 'Recovery Code' : 'Authentication Code' }}
                </label>
                <input wire:model="code" id="code" type="text" 
                    @if(!$useRecoveryCode) inputmode="numeric" autocomplete="one-time-code" @endif
                    required 
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1" 
                    placeholder="{{ $useRecoveryCode ? 'xxxxx-xxxxx' : '123456' }}">
                @error('code') <span class="text-red-500 text-xs mt-1 block">{{ $message }}</span> @enderror
            </div>

            <div>
                <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <span wire:loading.remove>Verify</span>
                    <span wire:loading>Verifying...</span>
                </button>
            </div>

            <div class="text-center mt-4">
                <button type="button" wire:click="toggleRecovery" class="text-sm font-medium text-blue-600 hover:text-blue-500">
                    {{ $useRecoveryCode ? 'Use an authentication code instead' : 'Use a recovery code instead' }}
                </button>
            </div>
        </form>
    </div>
</div>
