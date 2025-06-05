<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'login', 'email', 'password', 'gender', 'gpa', 'birthday', 'admission',
        'completion', 'phone','avatar','faculty','role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function hasRole($role)
    {
        return $this->role && $this->role->name === $role;
    }
    public function bookings()
    {
        return $this->hasMany(BarbershopBooking::class);
    }
    public function barbershopBookings()
    {
        return $this->hasMany(\App\Models\BarbershopBooking::class);
    }

    public function advisorBookings()
    {
        return $this->hasMany(\App\Models\AdvisorBooking::class);
    }

    public function asmedBookings()
    {
        return $this->hasMany(\App\Models\AsmedBooking::class);
    }

}
