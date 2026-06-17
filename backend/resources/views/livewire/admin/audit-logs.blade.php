<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Audit Logs'])] class extends Component {
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
                <input type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search logs...">
            </div>
        </div>
        <button class="text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-2 transition-colors">
            <i data-lucide="download" class="w-4 h-4"></i>
            Export Logs
        </button>
    </div>

    <!-- Audit Logs Empty State Example -->
    <x-card>
        <x-table>
            <x-slot name="head">
                <tr>
                    <th scope="col" class="px-6 py-4">Timestamp</th>
                    <th scope="col" class="px-6 py-4">User</th>
                    <th scope="col" class="px-6 py-4">Action</th>
                    <th scope="col" class="px-6 py-4">Target</th>
                </tr>
            </x-slot>
            
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    Just now
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <x-badge color="blue">System Updated</x-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    Layout redesign applied
                </td>
            </tr>
        </x-table>
    </x-card>
</div>
