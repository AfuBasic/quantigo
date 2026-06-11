@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Payment Confirmed
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    We have successfully processed and confirmed your payment contribution for the pool: <strong>{{ $poolName }}</strong>.
</p>

<!-- Receipt Summary -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px; font-size: 13px; color: #0F172A; line-height: 22px;">
    <tr>
        <td style="padding: 16px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="color: #64748B; padding-bottom: 8px;">Product / Service:</td>
                    <td style="text-align: right; font-weight: 700; padding-bottom: 8px;">{{ $productName }}</td>
                </tr>
                <tr>
                    <td style="color: #64748B; padding-bottom: 8px;">Amount Paid:</td>
                    <td style="text-align: right; font-weight: 700; color: #22C55E; padding-bottom: 8px;">₦{{ number_format($amount, 2) }}</td>
                </tr>
                <tr>
                    <td style="color: #64748B; padding-bottom: 8px;">Status:</td>
                    <td style="text-align: right; font-weight: 700; color: #2563EB; padding-bottom: 8px;">Joined (Escrow Locked)</td>
                </tr>
                <tr style="border-top: 1px solid #E2E8F0;">
                    <td style="color: #64748B; padding-top: 8px;">Procurement Status:</td>
                    <td style="text-align: right; font-weight: 700; padding-top: 8px;">{{ $procurementStatus }}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<p style="margin: 0 0 24px 0;">
    Your funds are held securely in escrow and will be dispatched to the factory once the group buy pool hits its target. You can monitor the progress of this pool directly inside your dashboard.
</p>

@include('emails.layouts.partials.button', ['url' => $dashboardUrl, 'slot' => 'View Group Buy Progress'])
@endsection
