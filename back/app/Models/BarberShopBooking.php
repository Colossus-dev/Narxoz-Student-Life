<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarberShopBooking extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'barber_id', 'date', 'time'];


    public static function getAvailableTimes(): array
    {
        return [
            '10:00', '11:00', '12:00', '13:00', '14:00',
            '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }

}
