<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

new #[Layout('components.layouts.admin-guest')] class extends Component {
    public string $code = '';
    public string $secret = '';
    public string $qrCodeUrl = '';
    public array $recoveryCodes = [];
    public bool $setupComplete = false;

    public function mount()
    {
        $admin = Auth::guard('admin')->user();
        if ($admin->two_factor_confirmed_at) {
            $this->redirect(route('admin.dashboard'));
            return;
        }

        $google2fa = new Google2FA();
        $this->secret = $google2fa->generateSecretKey();

        $renderer = new ImageRenderer(
            new RendererStyle(250),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        
        $qrCodeText = $google2fa->getQRCodeUrl(
            config('app.name'),
            $admin->email,
            $this->secret
        );
        
        $this->qrCodeUrl = 'data:image/svg+xml;base64,' . base64_encode($writer->writeString($qrCodeText));
    }

    public function verify()
    {
        $this->validate(['code' => 'required|numeric']);

        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey($this->secret, $this->code);

        if ($valid) {
            $admin = Auth::guard('admin')->user();
            $admin->two_factor_secret = $this->secret;
            
            // Generate 8 recovery codes
            $this->recoveryCodes = collect(range(1, 8))
                ->map(fn () => Str::random(10) . '-' . Str::random(10))
                ->toArray();
                
            $admin->two_factor_recovery_codes = encrypt(json_encode($this->recoveryCodes));
            $admin->two_factor_confirmed_at = now();
            $admin->save();

            session()->put('admin_2fa_passed', true);
            $this->setupComplete = true;
        } else {
            $this->addError('code', 'The provided two factor authentication code was invalid.');
        }
    }

    public function finish()
    {
        return redirect()->intended(route('admin.dashboard'));
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
        </div>

        @if(!$setupComplete)
            <div class="mt-4 space-y-4">
                <p class="text-sm text-gray-600 text-center">
                    To enable 2FA, scan the following QR code using your phone's authenticator application and enter the resulting code below.
                </p>

                <div class="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
                    <img src="{{ $qrCodeUrl }}" alt="QR Code" class="w-48 h-48">
                </div>

                <div class="text-center">
                    <p class="text-xs text-gray-500 mb-1">Setup Key (if you can't scan)</p>
                    <code class="text-sm bg-gray-100 px-2 py-1 rounded font-mono">{{ $secret }}</code>
                </div>

                <form wire:submit="verify" class="space-y-4 mt-6">
                    <div>
                        <label for="code" class="block text-sm font-medium text-gray-700">Authentication Code</label>
                        <input wire:model="code" id="code" type="text" inputmode="numeric" autocomplete="one-time-code" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1" placeholder="123456">
                        @error('code') <span class="text-red-500 text-xs mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        <span wire:loading.remove>Verify & Enable</span>
                        <span wire:loading>Verifying...</span>
                    </button>
                </form>
            </div>
        @else
            <div class="mt-4 space-y-4">
                <div class="rounded-md bg-green-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-green-800">
                                Two-factor authentication is now enabled.
                            </p>
                        </div>
                    </div>
                </div>

                <p class="text-sm text-gray-600">
                    Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two-factor authentication device is lost.
                </p>

                <div class="bg-gray-100 rounded-lg p-4 font-mono text-sm space-y-1">
                    @foreach($recoveryCodes as $code)
                        <div class="text-gray-800">{{ $code }}</div>
                    @endforeach
                </div>

                <button wire:click="finish" class="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-6">
                    I have saved my recovery codes
                </button>
            </div>
        @endif
    </div>
</div>
