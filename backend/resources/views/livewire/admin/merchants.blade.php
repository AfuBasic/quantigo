<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Merchants'])] class extends Component {
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
                <input type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search merchants...">
            </div>
            <button class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-4 focus:ring-slate-100 font-medium rounded-lg text-sm px-4 py-2.5 transition-colors">
                <i data-lucide="filter" class="w-4 h-4"></i>
            </button>
        </div>
        <button class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-2 transition-colors">
            <i data-lucide="plus" class="w-4 h-4"></i>
            Invite Merchant
        </button>
    </div>

    <!-- Merchants Table -->
    <x-card>
        <x-table>
            <x-slot name="head">
                <tr>
                    <th scope="col" class="px-6 py-4">Merchant Name</th>
                    <th scope="col" class="px-6 py-4">Contact</th>
                    <th scope="col" class="px-6 py-4">Status</th>
                    <th scope="col" class="px-6 py-4">Verification</th>
                    <th scope="col" class="px-6 py-4">Joined Date</th>
                    <th scope="col" class="px-6 py-4 text-right">Actions</th>
                </tr>
            </x-slot>
            
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-xs">DC</div>
                        <div>
                            <p class="font-medium text-slate-900 dark:text-white">Dangote Cement Retailers Ltd</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">RC-1092837</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-slate-900 dark:text-white">Alhaji Dangote</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">admin@dangote.com</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <x-badge color="green">Active</x-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <x-badge color="amber">Pending KYB</x-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    Oct 24, 2026
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button x-data @click="$dispatch('open-slide-merchant-details')" class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">View</button>
                </td>
            </tr>

            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-xs">SF</div>
                        <div>
                            <p class="font-medium text-slate-900 dark:text-white">Sabo Farmers Market</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">RC-882190</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-slate-900 dark:text-white">Tunde Bakare</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">tunde@sabo.ng</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <x-badge color="red">Suspended</x-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <x-badge color="green">Verified</x-badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    Sep 12, 2026
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">View</button>
                </td>
            </tr>
        </x-table>
        
        <!-- Pagination Placeholder -->
        <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 -mx-6 -mb-6 mt-6">
            <p class="text-sm text-slate-500 dark:text-slate-400">Showing 1 to 2 of 2 entries</p>
            <div class="flex gap-2">
                <button class="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-md text-slate-400 cursor-not-allowed">Previous</button>
                <button class="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-md text-slate-400 cursor-not-allowed">Next</button>
            </div>
        </div>
    </x-card>

    <!-- Slide-over for Merchant Details -->
    <x-slide-over id="merchant-details" title="Merchant Profile">
        <div class="space-y-6">
            <!-- Profile Header -->
            <div class="flex items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xl">DC</div>
                <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Dangote Cement Retailers Ltd</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Lagos, Nigeria</p>
                    <div class="mt-2 flex gap-2">
                        <x-badge color="green">Active</x-badge>
                        <x-badge color="amber">Pending KYB</x-badge>
                    </div>
                </div>
            </div>

            <!-- Verification Action -->
            <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                <div class="flex gap-3">
                    <i data-lucide="shield-alert" class="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0"></i>
                    <div>
                        <h4 class="text-sm font-semibold text-amber-900 dark:text-amber-300">Verification Required</h4>
                        <p class="text-xs text-amber-800 dark:text-amber-200 mt-1 mb-3">Please review the submitted business registration documents.</p>
                        <button class="text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded transition-colors">Review Documents</button>
                    </div>
                </div>
            </div>

            <!-- Business Information -->
            <div>
                <h4 class="text-sm font-semibold text-slate-900 dark:text-white mb-3">Business Information</h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-sm text-slate-500 dark:text-slate-400 col-span-1">Registration #</span>
                        <span class="text-sm text-slate-900 dark:text-white font-medium col-span-2">RC-1092837</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-sm text-slate-500 dark:text-slate-400 col-span-1">Tax ID</span>
                        <span class="text-sm text-slate-900 dark:text-white font-medium col-span-2">12345678-0001</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <span class="text-sm text-slate-500 dark:text-slate-400 col-span-1">Address</span>
                        <span class="text-sm text-slate-900 dark:text-white font-medium col-span-2">14 Awolowo Road, Ikoyi, Lagos</span>
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div>
                <h4 class="text-sm font-semibold text-slate-900 dark:text-white mb-3">Procurement Activity</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <p class="text-xs text-slate-500 dark:text-slate-400">Total Orders</p>
                        <p class="text-xl font-bold text-slate-900 dark:text-white mt-1">24</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                        <p class="text-xs text-slate-500 dark:text-slate-400">Active Pools</p>
                        <p class="text-xl font-bold text-slate-900 dark:text-white mt-1">3</p>
                    </div>
                </div>
            </div>
            
            <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <button class="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Suspend Account</button>
            </div>
        </div>
    </x-slide-over>
</div>
