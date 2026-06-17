@props(['title', 'value', 'icon' => 'activity', 'trend' => null, 'trendType' => 'up', 'color' => 'blue'])
@php
    $iconColors = [
        'blue' => 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20',
        'green' => 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-100 dark:border-green-500/20',
        'amber' => 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20',
        'red' => 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20',
        'slate' => 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
    ];
@endphp
<div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 {{ $iconColors[$color] ?? $iconColors['blue'] }}">
        <i data-lucide="{{ $icon }}" class="w-6 h-6"></i>
    </div>
    <div class="flex-1">
        <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ $title }}</h3>
        <p class="text-3xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">{{ $value }}</p>
        @if($trend)
            <div class="mt-2 flex items-center gap-1 text-sm {{ $trendType === 'up' ? 'text-green-600 dark:text-green-400' : ($trendType === 'down' ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400') }}">
                @if($trendType === 'up')
                    <i data-lucide="trending-up" class="w-4 h-4"></i>
                @elseif($trendType === 'down')
                    <i data-lucide="trending-down" class="w-4 h-4"></i>
                @endif
                <span class="font-medium">{{ $trend }}</span>
            </div>
        @endif
    </div>
</div>
