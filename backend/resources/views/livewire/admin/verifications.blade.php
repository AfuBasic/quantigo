<?php

use App\Models\MerchantProfile;
use App\Domains\Merchants\Actions\ChangeMerchantVerificationStatusAction;
use Livewire\Volt\Component;
use Livewire\Attributes\Layout;
use Livewire\WithPagination;

new #[Layout('components.layouts.admin', ['title' => 'Verifications & Compliance'])] class extends Component {
    use WithPagination;

    public $search = '';
    public $statusFilter = 'all_pending';
    
    // Modal states
    public $reviewNotes = '';
    public $requestedInfoItems = [];
    public $newItem = '';
    public ?int $selectedMerchantId = null;

    public function with(): array
    {
        return [
            'merchants' => MerchantProfile::with(['user', 'history' => fn($q) => $q->orderBy('created_at', 'desc')])
                ->whereIn('verification_status', ['submitted', 'under_review', 'resubmitted', 'compliance_review'])
                ->when($this->statusFilter !== 'all_pending', function($query) {
                    $query->where('verification_status', $this->statusFilter);
                })
                ->when($this->search, function ($query) {
                    $query->where(function($q) {
                        $q->where('business_name', 'like', '%' . $this->search . '%')
                          ->orWhere('registration_number', 'like', '%' . $this->search . '%');
                    });
                })
                ->orderBy('updated_at', 'asc')
                ->paginate(15),
            'stats' => [
                'total_pending' => MerchantProfile::whereIn('verification_status', ['submitted', 'under_review', 'resubmitted', 'compliance_review'])->count(),
                'compliance_review' => MerchantProfile::where('verification_status', 'compliance_review')->count(),
                'waiting_on_merchant' => MerchantProfile::where('verification_status', 'additional_information_requested')->count(),
            ]
        ];
    }

    public function selectMerchant($id)
    {
        $this->selectedMerchantId = $id;
        $this->reviewNotes = '';
        $this->requestedInfoItems = [];
        $this->dispatch('open-slide-document-review');
    }

    public function getSelectedMerchantProperty()
    {
        if (!$this->selectedMerchantId) return null;
        return MerchantProfile::with(['user', 'history'])->find($this->selectedMerchantId);
    }

    public function startReview()
    {
        if ($this->selectedMerchant) {
            ChangeMerchantVerificationStatusAction::execute(
                merchant: $this->selectedMerchant,
                newStatus: 'under_review',
                actorType: 'admin',
                actorId: auth('admin')->id(),
                notes: 'Began document review'
            );
        }
    }

    public function sendToCompliance()
    {
        if ($this->selectedMerchant) {
            ChangeMerchantVerificationStatusAction::execute(
                merchant: $this->selectedMerchant,
                newStatus: 'compliance_review',
                actorType: 'admin',
                actorId: auth('admin')->id(),
                notes: $this->reviewNotes ?: 'Sent for final compliance approval'
            );
            $this->closePanel();
        }
    }

    public function addRequestedItem()
    {
        if (trim($this->newItem)) {
            $this->requestedInfoItems[] = trim($this->newItem);
            $this->newItem = '';
        }
    }

    public function removeRequestedItem($index)
    {
        unset($this->requestedInfoItems[$index]);
        $this->requestedInfoItems = array_values($this->requestedInfoItems);
    }

    public function requestInformation()
    {
        if ($this->selectedMerchant && !empty($this->requestedInfoItems)) {
            ChangeMerchantVerificationStatusAction::execute(
                merchant: $this->selectedMerchant,
                newStatus: 'additional_information_requested',
                actorType: 'admin',
                actorId: auth('admin')->id(),
                notes: $this->reviewNotes ?: 'Requested additional documents',
                requestedInformation: $this->requestedInfoItems
            );
            $this->closePanel();
        }
    }

    public function approve()
    {
        if ($this->selectedMerchant) {
            ChangeMerchantVerificationStatusAction::execute(
                merchant: $this->selectedMerchant,
                newStatus: 'approved',
                actorType: 'admin',
                actorId: auth('admin')->id(),
                notes: $this->reviewNotes ?: 'Approved by compliance'
            );
            $this->closePanel();
        }
    }

    public function reject()
    {
        if ($this->selectedMerchant) {
            ChangeMerchantVerificationStatusAction::execute(
                merchant: $this->selectedMerchant,
                newStatus: 'rejected',
                actorType: 'admin',
                actorId: auth('admin')->id(),
                notes: $this->reviewNotes ?: 'Application rejected'
            );
            $this->closePanel();
        }
    }

    private function closePanel()
    {
        $this->dispatch('close-slide-document-review');
        $this->selectedMerchantId = null;
    }
}; ?>

<div class="space-y-6 pb-12">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
            <div class="relative w-full sm:w-80">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <i data-lucide="search" class="w-4 h-4"></i>
                </div>
                <input wire:model.live.debounce.300ms="search" type="text" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search applications...">
            </div>
            <select wire:model.live="statusFilter" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                <option value="all_pending">All Pending</option>
                <option value="submitted">New Submissions</option>
                <option value="resubmitted">Resubmitted</option>
                <option value="under_review">Under Review</option>
                <option value="compliance_review">Compliance Review</option>
            </select>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <x-stat-card title="Total Pending Workflow" value="{{ $stats['total_pending'] }}" icon="layers" color="blue" />
        <x-stat-card title="Awaiting Compliance" value="{{ $stats['compliance_review'] }}" icon="shield" color="amber" />
        <x-stat-card title="Waiting on Merchant" value="{{ $stats['waiting_on_merchant'] }}" icon="clock" color="slate" />
    </div>

    <!-- Verifications Table -->
    <x-card title="Verification Pipeline" description="Manage merchant applications through the compliance lifecycle.">
        <x-table>
            <x-slot name="head">
                <tr>
                    <th scope="col" class="px-6 py-4">Business Name</th>
                    <th scope="col" class="px-6 py-4">Status</th>
                    <th scope="col" class="px-6 py-4">Last Activity</th>
                    <th scope="col" class="px-6 py-4 text-right">Action</th>
                </tr>
            </x-slot>
            
            @forelse($merchants as $merchant)
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-xs">
                            {{ substr($merchant->business_name, 0, 2) }}
                        </div>
                        <div>
                            <p class="font-medium text-slate-900 dark:text-white">{{ $merchant->business_name }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ $merchant->registration_number }}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    @if($merchant->verification_status === 'submitted')
                        <x-badge color="blue">New Submission</x-badge>
                    @elseif($merchant->verification_status === 'resubmitted')
                        <x-badge color="amber">Resubmitted</x-badge>
                    @elseif($merchant->verification_status === 'under_review')
                        <x-badge color="slate">Under Review</x-badge>
                    @elseif($merchant->verification_status === 'compliance_review')
                        <x-badge color="green">Compliance Review</x-badge>
                    @endif
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {{ $merchant->updated_at->diffForHumans() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button wire:click="selectMerchant({{ $merchant->id }})" class="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-xs transition-colors">Manage Workflow</button>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                    No merchants matching the current filter.
                </td>
            </tr>
            @endforelse
        </x-table>

        <div class="mt-4">
            {{ $merchants->links() }}
        </div>
    </x-card>

    <!-- Document Review Slide-over -->
    <x-slide-over id="document-review" title="Compliance Workflow">
        @if($this->selectedMerchant)
        <div class="space-y-6">
            <div class="pb-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ $this->selectedMerchant->business_name }}</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Status: <span class="font-semibold capitalize text-slate-700 dark:text-slate-300">{{ str_replace('_', ' ', $this->selectedMerchant->verification_status) }}</span></p>
                </div>
                @if(in_array($this->selectedMerchant->verification_status, ['submitted', 'resubmitted']))
                    <button wire:click="startReview" class="text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 font-medium rounded-lg text-xs px-3 py-1.5 transition-colors">
                        Start Review
                    </button>
                @endif
            </div>

            <!-- Documents -->
            <div class="space-y-4">
                <h4 class="text-sm font-semibold text-slate-900 dark:text-white">Submitted Documents</h4>
                
                @foreach([
                    'CAC Certificate' => 'cac_certificate_path',
                    'CAC Status Report' => 'cac_status_report_path',
                    'Director Identity' => 'director_identity_path',
                    'Proof of Address' => 'proof_of_address_path',
                ] as $label => $field)
                    @if($this->selectedMerchant->$field)
                    <div class="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                        <div class="flex items-center gap-3">
                            <i data-lucide="file-text" class="w-5 h-5 text-blue-600 dark:text-blue-400"></i>
                            <div>
                                <p class="text-sm font-medium text-slate-900 dark:text-white">{{ $label }}</p>
                            </div>
                        </div>
                        <a href="{{ $this->selectedMerchant->$field }}" target="_blank" class="text-slate-400 hover:text-blue-600 transition-colors"><i data-lucide="eye" class="w-4 h-4"></i></a>
                    </div>
                    @endif
                @endforeach
            </div>

            <!-- Workflow History -->
            <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 class="text-sm font-semibold text-slate-900 dark:text-white">Audit Trail</h4>
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto space-y-3">
                    @forelse($this->selectedMerchant->history as $log)
                        <div class="text-sm">
                            <span class="text-slate-500 text-xs">{{ $log->created_at->format('M d, H:i') }}</span>
                            <span class="font-medium text-slate-700 dark:text-slate-300 ml-2 capitalize">{{ str_replace('_', ' ', $log->status_to) }}</span>
                            @if($log->notes)
                                <p class="text-xs text-slate-500 mt-0.5">{{ $log->notes }}</p>
                            @endif
                        </div>
                    @empty
                        <p class="text-xs text-slate-500">No history available.</p>
                    @endforelse
                </div>
            </div>

            <!-- Workflow Actions based on State -->
            <div class="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                
                @if(in_array($this->selectedMerchant->verification_status, ['under_review']))
                    
                    <textarea wire:model="reviewNotes" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-lg p-2.5" rows="2" placeholder="Internal notes..."></textarea>
                    
                    <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                        <h5 class="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2">Request Missing Information</h5>
                        <div class="flex gap-2 mb-2">
                            <input wire:model="newItem" type="text" placeholder="e.g. Please upload a clearer ID" class="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5" />
                            <button wire:click="addRequestedItem" class="bg-amber-600 text-white px-3 rounded-lg text-sm">Add</button>
                        </div>
                        <ul class="text-xs text-amber-700 space-y-1 mb-3">
                            @foreach($requestedInfoItems as $index => $item)
                                <li class="flex justify-between items-center bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
                                    <span>{{ $item }}</span>
                                    <button wire:click="removeRequestedItem({{ $index }})" class="text-amber-600 hover:text-amber-800">&times;</button>
                                </li>
                            @endforeach
                        </ul>
                        <button wire:click="requestInformation" disabled="{{ empty($requestedInfoItems) }}" class="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-2 rounded-lg disabled:opacity-50 transition-colors">
                            Send Request to Merchant
                        </button>
                    </div>

                    <button wire:click="sendToCompliance" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                        Send to Compliance Review
                    </button>

                @elseif($this->selectedMerchant->verification_status === 'compliance_review')

                    <textarea wire:model="reviewNotes" class="w-full bg-white dark:bg-slate-900 border border-red-200 dark:border-slate-700 text-sm rounded-lg p-2.5 mb-2" rows="2" placeholder="Reason for rejection (if rejecting)"></textarea>

                    <div class="flex gap-3">
                        <button wire:click="approve" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                            Approve
                        </button>
                        <button wire:click="reject" class="flex-1 bg-white dark:bg-slate-900 border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                            Reject
                        </button>
                    </div>

                @endif

                <div wire:loading class="text-sm text-blue-500 mt-2">
                    Processing...
                </div>
            </div>
        </div>
        @else
        <div class="flex items-center justify-center h-full text-slate-500">
            Select an application
        </div>
        @endif
    </x-slide-over>
</div>
