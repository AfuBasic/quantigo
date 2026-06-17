<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'System Settings'])] class extends Component {
    //
}; ?>

<div class="space-y-6 pb-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Sidebar Navigation for Settings -->
        <div class="md:col-span-1">
            <nav class="space-y-1">
                <a href="#" class="block px-4 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium text-sm">Platform Settings</a>
                <a href="#" class="block px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Procurement Settings</a>
                <a href="#" class="block px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Email Templates</a>
            </nav>
        </div>
        
        <!-- Settings Content -->
        <div class="md:col-span-2">
            <x-card title="Platform Settings" description="General configuration for the Quantigo platform.">
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
                        <input type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="Quantigo Ops">
                    </div>
                    <div class="pt-4">
                        <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </x-card>
        </div>
    </div>
</div>
