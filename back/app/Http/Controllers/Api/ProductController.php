<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        return Product::select('id', 'name', 'price', 'category', 'sizes', 'image')
            ->get()
            ->map(function ($product) {
                $product->image_url = $product->image
                    ? asset('storage/' . $product->image)
                    : null;
                return $product;
            });
    }

    public function show(Product $product)
    {
        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'category' => $product->category,
            'sizes' => is_string($product->sizes)
                ? json_decode($product->sizes, true)
                : $product->sizes,
            'image_url' => $product->image
                ? asset('storage/' . $product->image)
                : null,
        ]);
    }


}
