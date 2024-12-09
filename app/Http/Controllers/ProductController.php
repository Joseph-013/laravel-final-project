<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     */
    public function index()
    {
        $products = Product::all();

        return Inertia::render('Products', ['products' => $products]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified product.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Display the specified product by keyword attribute.
     */
    public function showByKeyword(string $keyword)
    {
        $product = Product::where('keyword', $keyword)->firstOrFail();
        return Inertia::render('OrderForm', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
