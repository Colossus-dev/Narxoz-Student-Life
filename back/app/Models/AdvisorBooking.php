<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvisorBooking extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'school', 'faculty', 'date', 'time', 'description', 'reason','status'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
