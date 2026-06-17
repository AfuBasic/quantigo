@props(['title' => null, 'description' => null, 'action' => null])
<div {{ $attributes->merge(['class' => 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden']) }}>
    @if($title || $action)
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <div>
                @if($title) <h3 class="font-semibold text-slate-900 dark:text-white">{{ $title }}</h3> @endif
                @if($description) <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ $description }}</p> @endif
            </div>
            @if($action) <div>{{ $action }}</div> @endif
        </div>
    @endif
    <div class="p-6">
        {{ $slot }}
    </div>
</div>
