<?php

namespace App\Models;

use App\Mail\BookingApprovedMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class BookingRequest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'room_id', 'city', 'privileges', 'attached_files', 'status','payment_status', 'contract_signed', 'payment_qr_url'];

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

    public function generateKaspiQr()
    {
        if (!$this->payment_qr_url) { // Проверяем, есть ли уже QR-код
            Log::info("Генерация QR для брони ID: " . $this->id);

            $amount = $this->room->price;
            if ($amount <= 0) {
                Log::warning("Ошибка: Цена комнаты ID {$this->room_id} равна 0!");
                return;
            }

            $kaspiNumber = '77075723696'; // Тестовый Kaspi Gold номер
            $qrData = "ST00012|Name=Kaspi Pay Test|PersonalAcc={$kaspiNumber}|Sum={$amount}|Purpose=Бронь #{$this->id}";

            // Генерируем QR-код через API goqr.me
            $qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode($qrData);

            Log::info("QR-ссылка: " . $qrUrl);

            // Обновляем только `payment_qr_url`, чтобы не запускать `updated()`
            $this->updateQuietly(['payment_qr_url' => $qrUrl]);

            Log::info("QR-код сохранён в базе");
        }
    }



    public function signContract(array $data)
    {
        if ($this->payment_status !== 'paid') {
            throw new \Exception("You can sign the contract only after payment.");
        }

        $this->update([
            'contract_data' => json_encode($data),
            'contract_signed' => true,
        ]);
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


                $bookingRequest->generateKaspiQr();
            }
        });
    }
}
