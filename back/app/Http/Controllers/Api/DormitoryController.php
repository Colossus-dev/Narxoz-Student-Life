<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dormitory;
use Illuminate\Http\Request;

class DormitoryController extends Controller
{
    public function index()
    {
        return Dormitory::withCount('rooms')->get();
    }
}
