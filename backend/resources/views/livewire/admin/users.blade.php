<?php

use Livewire\Volt\Component;
use Livewire\Attributes\Layout;

new #[Layout('components.layouts.admin', ['title' => 'Users & Roles'])] class extends Component {
    //
}; ?>

<div class="space-y-6 pb-12">
    <!-- Header Actions -->
    <div class="flex justify-end">
        <button class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-2 transition-colors">
            <i data-lucide="user-plus" class="w-4 h-4"></i>
            Invite User
        </button>
    </div>

    <!-- Users Empty State Example -->
    <x-card>
        <x-empty-state 
            icon="users" 
            title="Manage admin users" 
            description="Invite operations staff and assign them specific roles and permissions."
        >
        </x-empty-state>
    </x-card>
</div>
