@props(['icon' => 'folder-open', 'title', 'description' => null])
<div class="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
    <div class="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-inner">
        <i data-lucide="{{ $icon }}" class="w-6 h-6"></i>
    </div>
    <h3 class="text-sm font-semibold text-slate-900 dark:text-white">{{ $title }}</h3>
    @if($description)
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">{{ $description }}</p>
    @endif
    @if(isset($action))
        <div class="mt-6">
            {{ $action }}
        </div>
    @endif
</div>
