<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsmedBooking extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','iin', 'date', 'time', 'reason'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
