<?php

namespace App\Notifications;

use App\Models\MerchantProfile;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerificationStatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $merchantProfile;
    public $newStatus;

    /**
     * Create a new notification instance.
     */
    public function __construct(MerchantProfile $merchantProfile, string $newStatus)
    {
        $this->merchantProfile = $merchantProfile;
        $this->newStatus = $newStatus;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Quantigo: Business Verification Status Update')
            ->greeting('Hello ' . $notifiable->name . ',');

        switch ($this->newStatus) {
            case 'under_review':
                $message->line('Your business verification application is now actively under review by our compliance team.')
                        ->line('We will notify you once the review is complete or if we need more information.');
                break;
            case 'additional_information_requested':
                $message->line('Our compliance team requires additional information to proceed with your verification.')
                        ->action('Provide Information', url('/verification'))
                        ->line('Please log in to your dashboard to view the requested items and resubmit.');
                break;
            case 'approved':
                $message->success()
                        ->line('Congratulations! Your business verification application has been approved.')
                        ->line('You now have full access to all merchant features on Quantigo.')
                        ->action('Go to Dashboard', url('/dashboard'));
                break;
            case 'rejected':
                $message->error()
                        ->line('Unfortunately, we were unable to approve your business verification application at this time.')
                        ->action('View Details', url('/verification'))
                        ->line('Please review the notes in your dashboard or contact support for assistance.');
                break;
            default:
                $message->line('There has been an update to your business verification status.');
                break;
        }

        return $message;
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'status' => $this->newStatus,
            'merchant_profile_id' => $this->merchantProfile->id,
            'message' => 'Your verification status changed to: ' . str_replace('_', ' ', $this->newStatus),
        ];
    }
}
