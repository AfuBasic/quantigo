@props(['title' => 'Dashboard'])

@php
    $mainNav = [
        ['label' => 'Command Center', 'route' => 'admin.dashboard', 'icon' => 'layout-dashboard'],
        ['label' => 'Verifications', 'route' => 'admin.verifications', 'icon' => 'check-square'],
        ['label' => 'Operations', 'route' => 'admin.procurement-operations', 'icon' => 'activity'],
        ['label' => 'Procurement Pools', 'route' => 'admin.procurement-pools', 'icon' => 'layers'],
        ['label' => 'Merchants', 'route' => 'admin.merchants', 'icon' => 'users'],
        ['label' => 'Suppliers', 'route' => 'admin.suppliers', 'icon' => 'truck'],
        ['label' => 'Fulfillment', 'route' => 'admin.fulfillment', 'icon' => 'package'],
        ['label' => 'Products', 'route' => 'admin.products', 'icon' => 'box'],
        ['label' => 'Payments', 'route' => 'admin.payments', 'icon' => 'credit-card'],
        ['label' => 'Notifications', 'route' => 'admin.notifications', 'icon' => 'bell'],
        ['label' => 'Reports', 'route' => 'admin.reports', 'icon' => 'bar-chart-2'],
    ];

    $systemNav = [
        ['label' => 'Users & Roles', 'route' => 'admin.users', 'icon' => 'shield'],
        ['label' => 'Security', 'route' => 'admin.security', 'icon' => 'lock'],
        ['label' => 'Settings', 'route' => 'admin.system-settings', 'icon' => 'settings'],
        ['label' => 'Audit Logs', 'route' => 'admin.audit-logs', 'icon' => 'file-text'],
    ];
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }} - Quantigo Ops</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
    <script src="https://unpkg.com/lucide@latest"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>

<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased selection:bg-blue-500 selection:text-white" x-data="{ sidebarOpen: false, darkMode: true }" x-init="$watch('darkMode', val => val ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark'))">
    
    <div class="flex h-screen overflow-hidden">
        
        <!-- Mobile Sidebar Overlay -->
        <div x-show="sidebarOpen" x-transition.opacity class="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden" @click="sidebarOpen = false" x-cloak></div>

        <!-- Sidebar -->
        <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed inset-y-0 left-0 z-30 w-64 transform flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0 flex flex-shrink-0">
            
            <!-- Logo Area -->
            <div class="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/50">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/20">
                        <i data-lucide="command" class="text-white w-5 h-5"></i>
                    </div>
                    <span class="font-bold tracking-tight text-slate-900 dark:text-white">Quantigo Ops</span>
                </div>
            </div>

            <!-- Scrollable Navigation -->
            <div class="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
                <div class="space-y-1">
                    <p class="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
                    @foreach ($mainNav as $item)
                        <a href="{{ route($item['route']) }}"
                            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group {{ request()->routeIs($item['route']) ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200' }}">
                            <i data-lucide="{{ $item['icon'] }}"
                                class="w-4 h-4 transition-colors {{ request()->routeIs($item['route']) ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300' }}"></i>
                            {{ $item['label'] }}
                        </a>
                    @endforeach
                </div>

                <div class="mt-8 space-y-1">
                    <p class="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
                    @foreach ($systemNav as $item)
                        <a href="{{ route($item['route']) }}"
                            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group {{ request()->routeIs($item['route']) ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200' }}">
                            <i data-lucide="{{ $item['icon'] }}"
                                class="w-4 h-4 transition-colors {{ request()->routeIs($item['route']) ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300' }}"></i>
                            {{ $item['label'] }}
                        </a>
                    @endforeach
                </div>
            </div>

            <!-- User Profile & Theme Toggle -->
            <div class="p-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900">
                <div class="flex items-center justify-between px-2 mb-4">
                    <button @click="darkMode = !darkMode" class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" title="Toggle Theme">
                        <i x-show="!darkMode" data-lucide="moon" class="w-4 h-4"></i>
                        <i x-show="darkMode" data-lucide="sun" class="w-4 h-4" x-cloak></i>
                    </button>
                    <a href="#" class="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors" title="Help & Support">
                        <i data-lucide="help-circle" class="w-4 h-4"></i>
                    </a>
                </div>
                <div class="flex items-center gap-3 px-2 py-2 mb-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div class="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs">
                        {{ substr(auth('admin')->user()->name ?? 'A', 0, 1) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {{ auth('admin')->user()->name ?? 'Admin' }}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ auth('admin')->user()->email ?? '' }}</p>
                    </div>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                        <i data-lucide="log-out" class="w-4 h-4 group-hover:text-red-600 dark:group-hover:text-red-400"></i>
                        Sign out
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content Wrapper -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
            
            <!-- Top Navigation Bar -->
            <header class="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-10">
                <div class="flex items-center gap-4">
                    <button @click="sidebarOpen = true" class="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                        <i data-lucide="menu" class="w-5 h-5"></i>
                    </button>
                    <h1 class="text-lg font-semibold text-slate-900 dark:text-white">{{ $title }}</h1>
                </div>
                <div class="flex items-center gap-4">
                    <!-- Global Search Button -->
                    <button class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors w-64">
                        <i data-lucide="search" class="w-4 h-4"></i>
                        <span>Search everything...</span>
                        <kbd class="ml-auto text-xs font-sans bg-white dark:bg-slate-700 px-1.5 rounded border border-slate-200 dark:border-slate-600">⌘K</kbd>
                    </button>
                    <button class="sm:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <i data-lucide="search" class="w-5 h-5"></i>
                    </button>
                    <!-- Notifications -->
                    <button class="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    </button>
                </div>
            </header>

            @if(!auth('admin')->user() || !auth('admin')->user()->two_factor_confirmed_at)
                <div class="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <i data-lucide="shield-alert" class="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                        <div>
                            <p class="text-sm font-medium text-blue-900 dark:text-blue-300">Action Required: Secure your account</p>
                            <p class="text-xs text-blue-700 dark:text-blue-400/80">Set up Two-Factor Authentication to protect the platform.</p>
                        </div>
                    </div>
                    <a href="{{ route('admin.2fa.setup') }}"
                        class="text-sm font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700/50 px-4 py-1.5 rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                        Enable Now
                    </a>
                </div>
            @endif

            <!-- Main Content Area -->
            <div class="flex-1 overflow-auto p-4 sm:p-8">
                <div class="max-w-7xl mx-auto space-y-6">
                    {{ $slot }}
                </div>
            </div>
        </main>
    </div>

    @livewireScripts
    <script>
        lucide.createIcons();
    </script>
</body>

</html>
