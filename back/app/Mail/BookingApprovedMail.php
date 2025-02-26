<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\BookingRequest;

class BookingApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $bookingRequest;

    public function __construct(BookingRequest $bookingRequest)
    {
        $this->bookingRequest = $bookingRequest;
    }

    public function build()
    {
        return $this->subject('Ваша заявка обработана')
            ->view('emails.booking_approved')
            ->with([
                'userName' => $this->bookingRequest->user->name,
                'roomNumber' => $this->bookingRequest->room->room_number,
                'dormitory' => $this->bookingRequest->room->dormitory->name,
            ]);
    }
}
