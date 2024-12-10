<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'keyword' => $product->keyword,
                'active' => $product->active,
                'image_file' => $product->image_file 
                    ? Storage::url($product->image_file) 
                    : null
            ];
        });

        return Inertia::render('Products', ['products' => $products]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function showByKeyword(string $keyword)

    {
        $product = Product::where('keyword', $keyword)->firstOrFail();
        return Inertia::render('OrderForm', ['product' => $product]);
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
