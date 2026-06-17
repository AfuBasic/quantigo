<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Payments'])] class extends Component {
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
                <input type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search transactions...">
            </div>
            <button class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors">
                <i data-lucide="filter" class="w-4 h-4"></i>
            </button>
        </div>
        <button class="text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-2 transition-colors">
            <i data-lucide="download" class="w-4 h-4"></i>
            Export
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <x-stat-card title="Total Volume (Today)" value="₦0.00" icon="trending-up" color="green" />
        <x-stat-card title="Pending Settlements" value="₦0.00" icon="clock" color="amber" />
        <x-stat-card title="Failed Transactions" value="0" icon="alert-circle" color="red" />
    </div>

    <!-- Payments Empty State Example -->
    <x-card>
        <x-empty-state 
            icon="credit-card" 
            title="No transactions yet" 
            description="Transaction history will appear here once merchants start making payments for pools."
        >
        </x-empty-state>
    </x-card>
</div>
