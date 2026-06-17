@props(['id', 'title' => 'Details'])
<div x-data="{ open: false }" 
     @keydown.window.escape="open = false" 
     @open-slide-{{ $id }}.window="open = true"
     @close-slide-{{ $id }}.window="open = false"
     class="relative z-50" 
     aria-labelledby="slide-over-title" 
     role="dialog" 
     aria-modal="true" 
     x-show="open" 
     x-cloak>
    
    <!-- Background backdrop -->
    <div x-show="open" 
         x-transition.opacity.duration.300ms 
         class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div x-show="open" 
                     x-transition:enter="transform transition ease-in-out duration-300 sm:duration-500" 
                     x-transition:enter-start="translate-x-full" 
                     x-transition:enter-end="translate-x-0" 
                     x-transition:leave="transform transition ease-in-out duration-300 sm:duration-500" 
                     x-transition:leave-start="translate-x-0" 
                     x-transition:leave-end="translate-x-full" 
                     class="pointer-events-auto relative w-screen max-w-md"
                     @click.away="open = false">
                    
                    <!-- Close button -->
                    <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button type="button" @click="open = false" class="relative rounded-md text-slate-300 hover:text-white focus:outline-none">
                            <span class="sr-only">Close panel</span>
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-900 shadow-xl border-l border-slate-200 dark:border-slate-800">
                        <div class="px-4 py-6 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <h2 class="text-base font-semibold leading-6 text-slate-900 dark:text-white" id="slide-over-title">{{ $title }}</h2>
                        </div>
                        <div class="relative flex-1 px-4 py-6 sm:px-6">
                            {{ $slot }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
