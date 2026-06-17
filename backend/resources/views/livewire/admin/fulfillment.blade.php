<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Fulfillment'])] class extends Component {
    //
}; ?>

<div class="space-y-6 pb-12">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
            <div class="relative w-full sm:w-80">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <i data-lucide="search" class="w-4 h-4"></i>
                </div>
                <input type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search shipments...">
            </div>
            <button class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors">
                <i data-lucide="filter" class="w-4 h-4"></i>
            </button>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <x-stat-card title="Awaiting Arrival" value="0" icon="clock" color="slate" />
        <x-stat-card title="In Warehouse" value="0" icon="box" color="blue" />
        <x-stat-card title="Ready for Pickup" value="0" icon="check-square" color="amber" />
        <x-stat-card title="Completed Today" value="0" icon="truck" color="green" />
    </div>

    <!-- Fulfillment Empty State Example -->
    <x-card>
        <x-empty-state 
            icon="package" 
            title="No active shipments" 
            description="Manage inbound supplier deliveries and outbound merchant collections here."
        >
        </x-empty-state>
    </x-card>
</div>
