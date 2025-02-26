<?php

namespace App\Models;

use App\Mail\BookingApprovedMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class BookingRequest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'room_id', 'city', 'privileges', 'attached_files', 'status'];

    protected $casts = [
        'attached_files' => 'array',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($bookingRequest) {
            $room = Room::find($bookingRequest->room_id);
            if ($room->bookingRequests()->count() >= 10) {
                throw new \Exception('This room has reached the maximum number of 10 bookings.');
            }
        });
        static::updated(function ($bookingRequest) {
            if ($bookingRequest->isDirty('status') && $bookingRequest->status === 'approved') {
                Mail::to($bookingRequest->user->email)
                    ->queue(new BookingApprovedMail($bookingRequest));

            }
        });
    }
}
