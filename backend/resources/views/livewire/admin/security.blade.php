<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Security'])] class extends Component {
    //
}; ?>

<div class="space-y-6 pb-12">
    <!-- Security Modules -->
    <x-card title="Authentication Settings" description="Manage 2FA and login security.">
        <div class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div class="flex items-start gap-4">
                <div class="mt-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <i data-lucide="smartphone" class="w-4 h-4"></i>
                </div>
                <div>
                    <h4 class="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                    <p class="text-xs text-slate-500 mt-1">Require 2FA for all admin accounts to prevent unauthorized access.</p>
                </div>
            </div>
            <button class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Configure</button>
        </div>
    </x-card>
</div>
