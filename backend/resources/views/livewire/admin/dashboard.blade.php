<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Dashboard'])] class extends Component {
    //
}; ?>

<div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Quick Stats -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">Active Pools</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">12</p>
            <p class="text-sm text-green-600 mt-2 flex items-center gap-1">
                <i data-lucide="trending-up" class="w-4 h-4"></i>
                <span>+2 this week</span>
            </p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">Pending KYB Reviews</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">5</p>
            <p class="text-sm text-amber-600 mt-2 flex items-center gap-1">
                <i data-lucide="clock" class="w-4 h-4"></i>
                <span>Requires attention</span>
            </p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">Today's Fulfillment</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">8</p>
            <p class="text-sm text-gray-600 mt-2 flex items-center gap-1">
                <i data-lucide="package" class="w-4 h-4"></i>
                <span>Orders ready for pickup</span>
            </p>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 class="font-semibold text-gray-900">Recent Operational Activity</h3>
                    <button class="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
                </div>
                <div class="divide-y divide-gray-100">
                    <!-- Activity Item -->
                    <div class="px-6 py-4 flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">Pool #1024 - Cement Procurement marked as Filled</p>
                            <p class="text-sm text-gray-500 mt-1">Initiated by System • 10 mins ago</p>
                        </div>
                    </div>
                    <!-- Activity Item -->
                    <div class="px-6 py-4 flex gap-4">
                        <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                            <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">Supplier delay reported for Order #992</p>
                            <p class="text-sm text-gray-500 mt-1">Reported by Procurement Officer • 1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="space-y-6">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 class="font-semibold text-gray-900">Action Items</h3>
                </div>
                <div class="p-6 space-y-4">
                    <div class="flex items-start gap-3">
                        <input type="checkbox" class="mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500">
                        <div>
                            <p class="text-sm font-medium text-gray-900">Review new merchant applications</p>
                            <p class="text-xs text-gray-500">5 pending applications</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <input type="checkbox" class="mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500">
                        <div>
                            <p class="text-sm font-medium text-gray-900">Approve PO for Pool #1024</p>
                            <p class="text-xs text-gray-500">Requires Ops Manager approval</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
