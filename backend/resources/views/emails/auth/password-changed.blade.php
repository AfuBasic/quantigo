@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    Password successfully changed
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<p style="margin: 0 0 16px 0;">
    This is a quick security confirmation that the password for your Quantigo merchant account has been successfully updated on <strong>{{ $timestamp }}</strong>.
</p>
<p style="margin: 0 0 24px 0;">
    If you made this change, no further action is required.
</p>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; margin-bottom: 24px;">
    <tr>
        <td style="padding: 16px; font-size: 13px; color: #92400E; line-height: 20px;">
            <strong>Did you not make this change?</strong><br>
            If you did not authorize this password update, please contact our support team immediately or reset your password to lock your account.
        </td>
    </tr>
</table>

@include('emails.layouts.partials.button', ['url' => $supportUrl, 'slot' => 'Contact Support'])
@endsection
