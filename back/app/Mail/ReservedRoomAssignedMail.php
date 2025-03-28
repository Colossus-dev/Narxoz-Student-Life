<?php

namespace App\Mail;

use App\Models\BookingRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservedRoomAssignedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;

    public function __construct(BookingRequest $booking)
    {
        $this->booking = $booking;
    }

    public function build()
    {
        return $this->subject('Вы были перенаправлены в резервную комнату')
            ->view('emails.reserved-room-assigned');
    }

}
