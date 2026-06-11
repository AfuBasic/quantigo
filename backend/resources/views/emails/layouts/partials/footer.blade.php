<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px; border-top: 1px solid #E2E8F0; padding-top: 24px; text-align: center;">
    <tr>
        <td align="center" style="font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 12px; color: #64748B; line-height: 18px;">
            <p style="margin: 0; font-weight: 700; color: #0F172A;">Quantigo</p>
            <p style="margin: 4px 0 0 0;">Infrastructure Powering African Commerce</p>
            <p style="margin: 12px 0 0 0;">
                <a href="mailto:support@quantigo.com" style="color: #2563EB; text-decoration: none; font-weight: 600;">Contact Support</a>
                @if(isset($unsubscribeUrl))
                    <span style="color: #CBD5E1; margin: 0 8px;">•</span>
                    <a href="{{ $unsubscribeUrl }}" style="color: #64748B; text-decoration: none;">Unsubscribe</a>
                @endif
            </p>
            <p style="margin: 16px 0 0 0; font-size: 11px; color: #94A3B8;">
                &copy; {{ date('Y') }} Quantigo. All rights reserved.
            </p>
        </td>
    </tr>
</table>
