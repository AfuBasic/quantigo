@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Your inventory is ready for pickup!
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    Great news! Your ordered goods from the pool <strong>{{ $poolName }}</strong> have arrived at our fulfillment center and are ready for pickup.
</p>

<!-- Pickup Box -->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; margin-bottom: 24px; font-size: 13px; color: #166534; line-height: 22px;">
    <tr>
        <td style="padding: 16px;">
            <strong>Fulfillment Location:</strong><br>
            {{ $locationName }}<br>
            {{ $locationAddress }}<br><br>
            <strong>Collection Instructions:</strong><br>
            Please present the pickup QR code or Reference ID shown in your dashboard to the warehouse manager on arrival.
        </td>
    </tr>
</table>

@include('emails.layouts.partials.button', ['url' => $dashboardUrl, 'slot' => 'Get Pickup QR Code'])

<p style="margin: 24px 0 0 0; font-size: 13px; color: #64748B; border-top: 1px solid #F1F5F9; padding-top: 16px;">
    Fulfillment centers are open Monday to Friday (8 AM - 5 PM). Please collect your stock within 7 business days.
</p>
@endsection
