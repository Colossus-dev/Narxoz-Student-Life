<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function getByDormitory($id)
    {
        return Room::where('dormitory_id', $id)->get();
    }
}
