@props(['title' => 'Dashboard'])

@php
    $navigation = [
        ['label' => 'Dashboard', 'route' => 'admin.dashboard'],
        ['label' => 'Merchants', 'route' => 'admin.merchants'],
        ['label' => 'Suppliers', 'route' => 'admin.suppliers'],
        ['label' => 'Products', 'route' => 'admin.products'],
        ['label' => 'Procurement Pools', 'route' => 'admin.procurement-pools'],
        ['label' => 'Payments', 'route' => 'admin.payments'],
        ['label' => 'Procurement Operations', 'route' => 'admin.procurement-operations'],
        ['label' => 'Fulfillment', 'route' => 'admin.fulfillment'],
        ['label' => 'Notifications', 'route' => 'admin.notifications'],
        ['label' => 'Reports', 'route' => 'admin.reports'],
    ];
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }} - Quantigo Admin</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles
    </head>
    <body>
        <div class="min-h-screen bg-slate-50 text-slate-900">
            <aside class="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-6 lg:block">
                <div class="mb-8">
                    <p class="text-lg font-semibold">Quantigo</p>
                    <p class="text-sm text-slate-500">Admin Console</p>
                </div>

                <nav class="space-y-1">
                    @foreach ($navigation as $item)
                        <a
                            href="{{ route($item['route']) }}"
                            class="block rounded-md px-3 py-2 text-sm font-medium {{ request()->routeIs($item['route']) ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100' }}"
                        >
                            {{ $item['label'] }}
                        </a>
                    @endforeach
                </nav>
            </aside>

            <main class="lg:pl-72">
                <header class="border-b border-slate-200 bg-white px-6 py-5">
                    <p class="text-sm text-slate-500">Admin</p>
                    <h1 class="text-2xl font-semibold">{{ $title }}</h1>
                </header>

                <section class="p-6">
                    {{ $slot }}
                </section>
            </main>
        </div>

        @livewireScripts
    </body>
</html>
