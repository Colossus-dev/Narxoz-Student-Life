<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $dormitoryIds = [1, 2, 3];

        foreach ($dormitoryIds as $dormitoryId) {
            for ($floor = 1; $floor <= 5; $floor++) {
                for ($i = 1; $i <= 30; $i++) {
                    $roomNumber = $floor * 100 + $i;

                    Room::create([
                        'dormitory_id' => $dormitoryId,
                        'room_number' => $roomNumber,
                        'floor' => $floor,
                        'capacity' => rand(2, 3),
                        'reserve_status' => rand(0, 1), // 1 - резерв, 0 - обычный
                        'price' => $dormitoryId === 1 ? 74000 : 46000,
                    ]);
                }
            }
        }
    }
}
