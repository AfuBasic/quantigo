@extends('emails.layouts.app')

@section('content')
<h1 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 16px 0; letter-spacing: -0.5px; line-height: 30px;">
    {{ $title }}
</h1>
<p style="margin: 0 0 16px 0; font-weight: 500;">
    Hello {{ $name }},
</p>
<div style="font-size: 14px; color: #0F172A; line-height: 24px; margin-bottom: 24px;">
    {!! $body !!}
</div>

@if(isset($actionUrl) && isset($actionText))
    @include('emails.layouts.partials.button', ['url' => $actionUrl, 'slot' => $actionText])
@endif

<p style="margin: 24px 0 0 0; font-size: 12px; color: #64748B; border-top: 1px solid #F1F5F9; padding-top: 16px;">
    You are receiving this system update as an active merchant on Quantigo. If you have any feedback or questions, please let us know.
</p>
@endsection
