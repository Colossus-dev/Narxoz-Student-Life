<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'total' => 'required|integer',
        ]);

        $order = Order::create([
            'user_id' => Auth::id() ?? 1, // или можно сделать через токен
            'items' => $validated['items'],
            'total' => $validated['total'],
        ]);

        return response()->json([
            'message' => 'Заказ успешно оформлен',
            'order_id' => $order->id,
        ]);
    }
}
