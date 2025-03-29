<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable = ['floor','dormitory_id', 'room_number', 'capacity', 'occupied', 'price'];

    public function dormitory()
    {
        return $this->belongsTo(Dormitory::class);
    }

    public function bookingRequests()
    {
        return $this->hasMany(BookingRequest::class);
    }

    public function getOccupiedAttribute()
    {
        return $this->bookingRequests()->count();
    }

}
