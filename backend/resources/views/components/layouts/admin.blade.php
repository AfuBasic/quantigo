@props(['title' => 'Dashboard'])

@php
    $navigation = [
        ['label' => 'Dashboard', 'route' => 'admin.dashboard', 'icon' => 'home'],
        ['label' => 'Merchants', 'route' => 'admin.merchants', 'icon' => 'users'],
        ['label' => 'Suppliers', 'route' => 'admin.suppliers', 'icon' => 'truck'],
        ['label' => 'Products', 'route' => 'admin.products', 'icon' => 'package'],
        ['label' => 'Procurement Pools', 'route' => 'admin.procurement-pools', 'icon' => 'layers'],
        ['label' => 'Payments', 'route' => 'admin.payments', 'icon' => 'credit-card'],
        ['label' => 'Operations', 'route' => 'admin.procurement-operations', 'icon' => 'briefcase'],
        ['label' => 'Fulfillment', 'route' => 'admin.fulfillment', 'icon' => 'box'],
        ['label' => 'Notifications', 'route' => 'admin.notifications', 'icon' => 'bell'],
        ['label' => 'Reports', 'route' => 'admin.reports', 'icon' => 'bar-chart-2'],
    ];
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

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

<body class="bg-gray-50 text-gray-900 antialiased selection:bg-blue-500 selection:text-white">
    <div class="flex h-screen overflow-hidden bg-gray-100">
        <!-- Sidebar -->
        <aside class="w-64 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
            <div class="h-16 flex items-center px-6 border-b border-gray-100">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <i data-lucide="command" class="text-white w-5 h-5"></i>
                    </div>
                    <span class="font-bold text-gray-900 tracking-tight">Quantigo Ops</span>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                @foreach ($navigation as $item)
                    <a href="{{ route($item['route']) }}"
                        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors {{ request()->routeIs($item['route']) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <i data-lucide="{{ $item['icon'] }}"
                            class="w-4 h-4 {{ request()->routeIs($item['route']) ? 'text-blue-700' : 'text-gray-400' }}"></i>
                        {{ $item['label'] }}
                    </a>
                @endforeach
            </div>

            <div class="p-4 border-t border-gray-100">
                <div class="flex items-center gap-3 px-2 py-2 mb-2">
                    <div
                        class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xs">
                        {{ substr(auth('admin')->user()->name ?? 'A', 0, 1) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">
                            {{ auth('admin')->user()->name ?? 'Admin' }}</p>
                        <p class="text-xs text-gray-500 truncate">{{ auth('admin')->user()->email ?? '' }}</p>
                    </div>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit"
                        class="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-red-600 transition-colors">
                        <i data-lucide="log-out" class="w-4 h-4"></i>
                        Sign out
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col overflow-hidden">
            <header class="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white flex-shrink-0">
                <h1 class="text-xl font-semibold text-gray-900">{{ $title }}</h1>
                <div class="flex items-center gap-4">
                    <button class="text-gray-400 hover:text-gray-500">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                    </button>
                </div>
            </header>

            @if(!auth('admin')->user()->two_factor_confirmed_at)
                <div class="bg-blue-50 border-b border-blue-100 px-8 py-3 flex items-center justify-between flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <i data-lucide="shield-alert" class="w-5 h-5 text-blue-600"></i>
                        <p class="text-sm font-medium text-blue-900">Enhance your account security</p>
                        <span class="text-sm text-blue-700">Set up Two-Factor Authentication to protect your admin
                            account.</span>
                    </div>
                    <a href="{{ route('admin.2fa.setup') }}"
                        class="text-sm font-medium text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition-colors">
                        Enable 2FA
                    </a>
                </div>
            @endif

            <div class="flex-1 overflow-auto p-8 bg-[#F8FAFC]">
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
