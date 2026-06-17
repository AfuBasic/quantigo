<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Reports'])] class extends Component {
    //
}; ?>

<div class="space-y-6 pb-12">
    <!-- Reports Empty State Example -->
    <x-card>
        <x-empty-state 
            icon="bar-chart-2" 
            title="Reporting module" 
            description="Visualise platform metrics, merchant growth, and procurement volume."
        >
            <x-slot name="action">
                <button class="text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors flex items-center gap-2">
                    <i data-lucide="download" class="w-4 h-4"></i>
                    Export Raw Data
                </button>
            </x-slot>
        </x-empty-state>
    </x-card>
</div>
