<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barber extends Model
{
    use HasFactory;
    protected $fillable = ['name','experience'];

    public function bookings()
    {
        return $this->hasMany(BarbershopBooking::class);
    }
}
