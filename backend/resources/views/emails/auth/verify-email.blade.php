@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Verify your email address
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    Please verify your email address to secure your merchant account and begin business verification on the Quantigo platform.
</p>
<p style="margin: 0 0 24px 0;">
    Click the button below to confirm your email. This link will expire in 60 minutes for security reasons.
</p>

@include('emails.layouts.partials.button', ['url' => $verifyUrl, 'slot' => 'Verify Email Address'])

<p style="margin: 24px 0 0 0; font-size: 12px; color: #64748B; word-break: break-all; border-top: 1px solid #F1F5F9; padding-top: 16px;">
    If you're having trouble clicking the button, copy and paste this URL into your browser: <br>
    <a href="{{ $verifyUrl }}" style="color: #2563EB; text-decoration: none;">{{ $verifyUrl }}</a>
</p>
@endsection
