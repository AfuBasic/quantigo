<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\Auth\WelcomeMail;
use App\Mail\Auth\VerifyEmailMail;
use App\Mail\Auth\ResetPasswordMail;
use App\Mail\Auth\PasswordChangedMail;
use App\Mail\Auth\LoginAlertMail;
use App\Mail\Notifications\PaymentConfirmedMail;
use App\Mail\Notifications\ProcurementUpdateMail;
use App\Mail\Notifications\PickupReadyMail;
use App\Mail\System\AnnouncementMail;
use Illuminate\Support\Facades\Mail;

class SendSampleEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quantigo:send-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send all 9 sample Quantigo emails to the first merchant in the DB';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $user = User::first();
        if (!$user) {
            $this->error('No user found in system.');
            return Command::FAILURE;
        }

        $this->info("Sending all sample emails to: {$user->email} ({$user->name})");

        // 1. Welcome
        Mail::to($user->email)->send(new WelcomeMail($user->name, 'http://localhost:5173/dashboard'));
        $this->line('- Welcome Email queued');

        // 2. Verify Email
        Mail::to($user->email)->send(new VerifyEmailMail($user->name, 'http://localhost:8568/api/v1/auth/verify-email?id=1&hash=abc'));
        $this->line('- Verify Email queued');

        // 3. Reset Password
        Mail::to($user->email)->send(new ResetPasswordMail($user->name, 'http://localhost:5173/reset-password?token=test-token&email=' . urlencode($user->email)));
        $this->line('- Reset Password queued');

        // 4. Password Changed
        Mail::to($user->email)->send(new PasswordChangedMail($user->name, now()->toDateTimeString(), 'http://localhost:5173/support'));
        $this->line('- Password Changed queued');

        // 5. Login Alert
        Mail::to($user->email)->send(new LoginAlertMail($user->name, now()->toDateTimeString(), '197.210.64.12', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'http://localhost:5173/reset-password'));
        $this->line('- Login Alert queued');

        // 6. Payment Confirmed
        Mail::to($user->email)->send(new PaymentConfirmedMail($user->name, 'Lagos Medicine Pool B', 'Amoxicillin 500mg (Box of 100)', 75000.00, 'Pool Active', 'http://localhost:5173/dashboard'));
        $this->line('- Payment Confirmed queued');

        // 7. Procurement Update
        Mail::to($user->email)->send(new ProcurementUpdateMail($user->name, 'Lagos Medicine Pool B', 'Goods Left Port', 'The container has left the Apapa Port and is on its way to the central warehouse.', 'http://localhost:5173/dashboard'));
        $this->line('- Procurement Update queued');

        // 8. Pickup Ready
        Mail::to($user->email)->send(new PickupReadyMail($user->name, 'Lagos Medicine Pool B', 'Apapa Main Warehouse', '12 Warehouse Road, Apapa, Lagos', 'http://localhost:5173/dashboard'));
        $this->line('- Pickup Ready queued');

        // 9. Announcement
        Mail::to($user->email)->send(new AnnouncementMail($user->name, 'Scheduled System Maintenance', '<p>Quantigo will undergo scheduled system maintenance on Sunday, June 14, 2026, from 2:00 AM to 4:00 AM WAT.</p><p>During this period, the command center will be offline. No actions are required from your end.</p>', 'http://localhost:5173/dashboard', 'Check Status'));
        $this->line('- Announcement queued');

        $this->info('All 9 emails successfully dispatched to the queue!');
        return Command::SUCCESS;
    }
}
