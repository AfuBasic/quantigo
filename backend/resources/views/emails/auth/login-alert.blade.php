@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    New device login detected
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    We detected a new login to your Quantigo merchant account. Here are the details of the login session:
</p>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px;">
    <tr>
        <td style="padding: 16px; font-size: 13px; color: #0F172A; line-height: 22px;">
            <strong>Time:</strong> {{ $time }}<br>
            <strong>IP Address:</strong> {{ $ip }}<br>
            <strong>Device / Browser:</strong> {{ $userAgent }}
        </td>
    </tr>
</table>

<p style="margin: 0 0 24px 0;">
    If this was you, no action is needed. If you do not recognize this activity, please reset your password immediately to secure your account.
</p>

@include('emails.layouts.partials.button', ['url' => $resetUrl, 'slot' => 'Secure My Account'])
@endsection
