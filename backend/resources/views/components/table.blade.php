<div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <table class="w-full text-left text-sm text-slate-600 dark:text-slate-400">
        <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-200 font-medium border-b border-slate-200 dark:border-slate-800">
            {{ $head }}
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800/50">
            {{ $slot }}
        </tbody>
    </table>
</div>
