<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
{
    $products = Product::all()->map(function ($product) {
        return [
            'id' => $product->productID,
            'productname' => $product->productname,
            'category' => $product->category,
            'price' => $product->price_formatted,
            'stock' => $product->stock,
            'image_url' => $product->image_path 
                ? Storage::url($product->image_path) 
                : null
        ];
    });

    return Inertia::render('Admin/ManageProducts', [
        'products' => $products
    ]);
}

public function store(Request $request)
{
    // Validation rules
    $validator = Validator::make($request->all(), [
        'productname' => 'required|unique:products|string|max:255',
        'category' => 'required|string|max:100',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    // Check validation
    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Create product
    $product = new Product();
    $product->productname = $request->input('productname');
    $product->category = $request->input('category');
    $product->price = $request->input('price');
    $product->stock = $request->input('stock');
    $product->description = $request->input('description');

    // Handle image upload
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $product->image_path = $imagePath;
    }

    $product->save();

    // Redirect back with a success message
    return redirect()->route('admin.index')->with('success', 'Product created successfully');
}

public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();

    return redirect()->route('admin.index')->with('success', 'Product deleted successfully');
}
}
