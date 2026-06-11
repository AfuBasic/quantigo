@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Procurement Update: {{ $updateTitle }}
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    We are writing to update you on your active group buy pool: <strong>{{ $poolName }}</strong>.
</p>

<!-- Update Box -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; margin-bottom: 24px;">
    <tr>
        <td style="padding: 16px; font-size: 13px; color: #1E40AF; line-height: 20px;">
            <strong>Current Milestone:</strong> {{ $updateTitle }}<br>
            <span style="color: #1E3A8A;">{{ $updateDescription }}</span>
        </td>
    </tr>
</table>

<p style="margin: 0 0 24px 0;">
    You can track the live delivery steps, container tracking log, and factory notes in your dashboard.
</p>

@include('emails.layouts.partials.button', ['url' => $dashboardUrl, 'slot' => 'Track Order Delivery'])
@endsection
