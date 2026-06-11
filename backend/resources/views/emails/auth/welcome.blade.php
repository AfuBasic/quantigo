@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Welcome to Quantigo!
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    We are excited to have you onboard. Quantigo is a procurement coordination platform designed to help retail merchants pool orders, share shipping resources, and secure direct manufacturer pricing.
</p>
<p style="margin: 0 0 24px 0;">
    To complete setting up your shop, please finish your business onboarding profile details (CAC filings, business address, and director identity checks) inside your command center.
</p>

@include('emails.layouts.partials.button', ['url' => $dashboardUrl, 'slot' => 'Complete Shop Onboarding'])

<p style="margin: 24px 0 0 0; font-size: 13px; color: #64748B; border-top: 1px solid #F1F5F9; padding-top: 16px;">
    Need help setting up your merchant profile? Our team is always ready to guide you. Just hit reply or get in touch through support channels.
</p>
@endsection
