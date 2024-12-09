<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
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

    return Inertia::render('Admin/ManageProducts', [
        'products' => $products
    ]);
}

public function store(Request $request)
{
    // Validation rules
    $validator = Validator::make($request->all(), [
        'name' => 'required|unique:products|string|max:255',
        'keyword' => 'required|string|max:255',
        'active' => 'required|boolean',
        'description' => 'nullable|string',
        'image_file' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    // Check validation
    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    // Create product
    $product = new Product();
    $product->name = $request->input('name');
    $product->keyword = $request->input('keyword');
    $product->active = $request->input('active');
    $product->description = $request->input('description');

    // Handle image upload
    if ($request->hasFile('image_file')) {
        $imagePath = $request->file('image_file')->store('products', 'public');
        $product->image_file = $imagePath;
    } else {
        $product->image_file = 'products/default.jpg';
    }

    $product->save();

    // Redirect back with a success message
    return redirect()->route('admin.index')->with('success', 'Product created successfully');
}

public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);


    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255|unique:products,name,' . $id,
        'keyword' => 'required|string|max:255',
        'description' => 'nullable|string',
        'active' => 'required|boolean',
        'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    $product->name = $request->input('name');
    $product->keyword = $request->input('keyword');
    $product->description = $request->input('description');
    $product->active = $request->input('active');

    if ($request->hasFile('image_file')) {
        // Delete old image
        if ($product->image_file && Storage::exists($product->image_file)) {
            Storage::delete($product->image_file);
        }
        $product->image_file = $request->file('image_file')->store('products', 'public');
    }

    $product->save();

    return redirect()->route('admin.index')->with('success', 'Product updated successfully');
}


public function destroy($id)
{
    $product = Product::find($id);
    $product->delete();

    return redirect()->route('admin.index')->with('success', 'Product deleted successfully');
}



//user route
public function users()
{
    $users = User::all();

    $bannedUsers = User::onlyTrashed()->get();
        

    return Inertia::render('Admin/ManageUsers', [
        'users' => $users,
        'bannedUsers' => $bannedUsers
    ]);
}

public function banUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete(); 
    
    return redirect()->back()->with('success', 'User banned successfully');
    }

    public function unbanUser($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();
    
        return redirect()->back()->with('success', 'Post restored successfully');
    }

}

