<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <title>{{ $subject ?? 'Quantigo' }}</title>
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            background-color: #F8FAFC;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
    </style>
</head>
<body style="margin: 0; padding: 40px 0; width: 100%; background-color: #F8FAFC;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width: 600px; max-width: 600px;">
                    <tr>
                        <td style="padding: 0 24px;">
                            @include('emails.layouts.partials.header')
                            
                            <!-- Card Container -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025); overflow: hidden;">
                                <tr>
                                    <td style="padding: 40px 32px; font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 14px; color: #0F172A; line-height: 24px;">
                                        @yield('content')
                                    </td>
                                </tr>
                            </table>
                            
                            @include('emails.layouts.partials.footer')
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
