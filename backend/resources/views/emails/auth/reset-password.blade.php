@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Reset your password
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    You are receiving this email because we received a password reset request for your Quantigo merchant account.
</p>
<p style="margin: 0 0 24px 0;">
    Click the button below to reset your password. This link will expire in 60 minutes.
</p>

@include('emails.layouts.partials.button', ['url' => $resetUrl, 'slot' => 'Reset Account Password'])

<p style="margin: 24px 0 0 0; font-size: 13px; color: #64748B; border-top: 1px solid #F1F5F9; padding-top: 16px;">
    If you did not request a password reset, no further action is required and your account remains secure.
</p>
<p style="margin: 12px 0 0 0; font-size: 12px; color: #94A3B8; word-break: break-all;">
    Link fallback: <br>
    <a href="{{ $resetUrl }}" style="color: #2563EB; text-decoration: none;">{{ $resetUrl }}</a>
</p>
@endsection
