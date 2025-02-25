<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable = ['dormitory_id', 'floor', 'room_number', 'capacity', 'occupied'];

    public function dormitory()
    {
        return $this->belongsTo(Dormitory::class);
    }

    public function bookingRequests()
    {
        return $this->hasMany(BookingRequest::class);
    }
}
