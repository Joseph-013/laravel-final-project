<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $queryParameters = [];

        $query = Product::query();

        if (request('searchProducts')) {
            $query->where(function ($query) {
                $searchTerm = '%' . request('searchProducts') . '%';
                $query->where('name', 'like', $searchTerm)
                    ->orWhere('description', 'like', $searchTerm)
                    ->orWhere('keyword', 'like', $searchTerm);
            });
            $queryParameters['searchProducts'] = request('searchProducts');
        }

        $products = $query->where('active', true)->get();

        return Inertia::render('Products', [
            'products' => $products,
            'queryParameters' => $queryParameters
        ]);
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
        $default_address = Auth::user()->default_address;

        return Inertia::render('OrderForm', [
            'product' => $product,
            'default_address' => $default_address
        ]);
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
