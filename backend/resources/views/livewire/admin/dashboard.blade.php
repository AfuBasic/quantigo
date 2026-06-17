<?php

use App\Models\MerchantProfile;
use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Command Center'])] class extends Component {
    public function with(): array
    {
        return [
            'pendingReviewsCount' => MerchantProfile::where('verification_status', 'pending')->count(),
            'recentPendingReviews' => MerchantProfile::where('verification_status', 'pending')
                ->orderBy('created_at', 'asc') // Oldest first (waiting longest)
                ->take(5)
                ->get(),
        ];
    }
}; ?>

<div class="space-y-8 pb-12">
    <!-- Section 1: Operations Command Center (Hero) -->
    <div class="bg-blue-600 dark:bg-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div class="absolute left-1/4 bottom-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl -mb-10"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h2 class="text-3xl font-bold tracking-tight">Good Morning, Admin</h2>
                <div class="mt-2 flex items-center gap-2">
                    <span class="flex w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span class="text-blue-100 font-medium">Operations Status: Healthy</span>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-4">
                <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[140px]">
                    <p class="text-blue-100 text-sm">Active Pools</p>
                    <p class="text-3xl font-bold mt-1">12</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[140px]">
                    <p class="text-blue-100 text-sm">Pending Reviews</p>
                    <p class="text-3xl font-bold mt-1">{{ $pendingReviewsCount }}</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 min-w-[140px]">
                    <p class="text-blue-100 text-sm">Supplier Responses</p>
                    <p class="text-3xl font-bold mt-1 text-amber-300">3</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Section 2: Operational Inbox -->
    <x-card title="Operational Inbox" description="Items requiring your immediate attention.">
        <x-slot name="action">
            <button class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                <i data-lucide="check-square" class="w-4 h-4"></i>
                Mark all as read
            </button>
        </x-slot>
        
        <div class="divide-y divide-slate-100 dark:divide-slate-800 -mx-6 -my-6">
            <a href="#" class="block px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div class="flex items-start gap-4">
                    <div class="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Merchant Verification Awaiting Review</h4>
                            <span class="text-xs text-slate-500 dark:text-slate-400">10 mins ago</span>
                        </div>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">Dangote Cement Retailers Ltd submitted KYB documents.</p>
                    </div>
                </div>
            </a>
            <a href="#" class="block px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div class="flex items-start gap-4">
                    <div class="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Pool #1042 Reached Procurement Threshold</h4>
                            <span class="text-xs text-slate-500 dark:text-slate-400">1 hour ago</span>
                        </div>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">The rice procurement pool is fully funded and ready for supplier assignment.</p>
                    </div>
                </div>
            </a>
            <a href="#" class="block px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div class="flex items-start gap-4">
                    <div class="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Supplier Delayed Response</h4>
                            <span class="text-xs text-slate-500 dark:text-slate-400">3 hours ago</span>
                        </div>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">Bua Sugar Co. has not acknowledged PO #992 within the 24hr window.</p>
                    </div>
                </div>
            </a>
            <a href="#" class="block px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group opacity-60">
                <div class="flex items-start gap-4">
                    <div class="w-2 h-2 mt-2 rounded-full bg-transparent flex-shrink-0"></div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-slate-900 dark:text-white">Inventory Received At Warehouse</h4>
                            <span class="text-xs text-slate-500 dark:text-slate-400">Yesterday</span>
                        </div>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">Shipment for Pool #1030 has been cataloged.</p>
                    </div>
                </div>
            </a>
        </div>
    </x-card>

    <!-- Section 3: Procurement Pipeline -->
    <x-card title="Procurement Pipeline" description="Current status of all active operations.">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 py-4">
            <!-- Stage 1 -->
            <div class="text-center group cursor-pointer">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span class="font-bold">4</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Created</p>
            </div>
            <!-- Stage 2 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span class="font-bold">12</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Active</p>
            </div>
            <!-- Stage 3 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span class="font-bold">3</span>
                </div>
                <p class="text-xs font-bold text-slate-900 dark:text-white mt-3">Filled</p>
            </div>
            <!-- Stage 4 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span class="font-bold">2</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Ready</p>
            </div>
            <!-- Stage 5 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span class="font-bold">5</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Confirmed</p>
            </div>
            <!-- Stage 6 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <span class="font-bold">1</span>
                </div>
                <p class="text-xs font-bold text-slate-900 dark:text-white mt-3">Ordered</p>
            </div>
            <!-- Stage 7 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span class="font-bold">4</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Received</p>
            </div>
            <!-- Stage 8 -->
            <div class="text-center group cursor-pointer relative">
                <div class="hidden lg:block absolute top-6 -left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-green-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <span class="font-bold">8</span>
                </div>
                <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mt-3">Collection</p>
            </div>
        </div>
    </x-card>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Section 4: Business Verification Queue -->
        <x-card title="Verification Queue" description="Merchants waiting for KYB approval.">
            <x-slot name="action">
                <a href="{{ route('admin.verifications') }}" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View All</a>
            </x-slot>
            <div class="space-y-4">
                @forelse($recentPendingReviews as $review)
                <div class="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold">
                            {{ substr($review->business_name, 0, 2) }}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ $review->business_name }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">Waiting for {{ $review->updated_at->diffForHumans() }}</p>
                        </div>
                    </div>
                    <x-badge color="amber">Pending</x-badge>
                </div>
                @empty
                <div class="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                    No pending reviews.
                </div>
                @endforelse
            </div>
        </x-card>

        <!-- Section 5: Supplier Operations -->
        <x-card title="Supplier Activity" description="Active orders and supplier responses.">
            <x-slot name="action">
                <a href="{{ route('admin.suppliers') }}" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Manage</a>
            </x-slot>
            <div class="space-y-4">
                <div class="flex flex-col gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i data-lucide="clock" class="w-4 h-4 text-amber-600 dark:text-amber-500"></i>
                            <span class="text-sm font-semibold text-amber-900 dark:text-amber-300">Delayed Response</span>
                        </div>
                        <span class="text-xs font-medium text-amber-700 dark:text-amber-400">PO #992</span>
                    </div>
                    <p class="text-sm text-amber-800 dark:text-amber-200">Bua Sugar Co. hasn't accepted the PO sent yesterday.</p>
                </div>
                <div class="flex flex-col gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i data-lucide="truck" class="w-4 h-4 text-slate-600 dark:text-slate-400"></i>
                            <span class="text-sm font-semibold text-slate-900 dark:text-white">Delivery Expected Today</span>
                        </div>
                        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">PO #980</span>
                    </div>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Flour Mills of Nigeria is scheduled to deliver 500 bags.</p>
                </div>
            </div>
        </x-card>
    </div>

    <!-- Sections 6 & 7: Fulfillment & Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Fulfillment Center -->
        <x-card title="Fulfillment Center" description="Warehouse and collection tracking.">
            <x-slot name="action">
                <a href="{{ route('admin.fulfillment') }}" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Warehouse view</a>
            </x-slot>
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <i data-lucide="box" class="w-4 h-4"></i>
                        </div>
                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Awaiting Inventory</span>
                    </div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white">12 Shipments</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <i data-lucide="check-square" class="w-4 h-4"></i>
                        </div>
                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Ready For Collection</span>
                    </div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white">8 Orders</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                            <i data-lucide="truck" class="w-4 h-4"></i>
                        </div>
                        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Collected Today</span>
                    </div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white">3 Orders</span>
                </div>
            </div>
        </x-card>

        <!-- Alerts & Exceptions -->
        <x-card title="System Alerts & Exceptions">
            <x-slot name="action">
                <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View Log</a>
            </x-slot>
            
            <div class="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div class="text-center">
                    <i data-lucide="check-circle" class="w-8 h-8 text-green-500 mx-auto mb-2"></i>
                    <p class="text-sm font-medium text-slate-600 dark:text-slate-400">No active exceptions</p>
                    <p class="text-xs text-slate-500 mt-1">All systems operating normally.</p>
                </div>
            </div>
        </x-card>
    </div>
</div>
