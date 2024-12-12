<?php

namespace App\Http\Controllers;

use App\Models\CarouselPhoto;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

class AdminController extends Controller
{
    public function index()
    {
        $products = Product::all();

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
            $file = $request->file('image_file');
            $filename = $request->input('keyword') . '.' . $file->getClientOriginalExtension();;

            $file->storeAs('products', $filename, 'public');

            $urlPath = 'storage/products/' . $filename;

            $image = Image::read($urlPath)->cover(500, 500, 'center');
            $image->save();
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

        // Handle image upload
        if ($request->hasFile('image_file')) {
            $filename = str_replace('/storage/products/', '', $product->imageSrc);

            if (Storage::disk('products')->exists($filename)) {
                Storage::disk('products')->delete($filename);
            }
            $file = $request->file('image_file');
            $filename = $request->input('keyword') . '.' . $file->getClientOriginalExtension();;

            $file->storeAs('products', $filename, 'public');

            $urlPath = 'storage/products/' . $filename;

            $image = Image::read($urlPath)->cover(500, 500, 'center');
            $image->save();
        } else {
            $product->image_file = 'products/default.jpg';
        }

        $product->save();

        return redirect()->route('admin.index')->with('success', 'Product updated successfully');
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $filename = str_replace('/storage/products/', '', $product->imageSrc);

        if (Storage::disk('public')->exists('products/' . $filename)) {
            Storage::disk('public')->delete('products/' . $filename);
        }

        $product->delete();

        return redirect()->route('admin.index')->with('success', 'Product deleted successfully');
    }



    //user route
    public function users()
    {
        // $users = User::all();

        // $bannedUsers = User::onlyTrashed()->get();

        $queryParameters = [];

        $userQuery = User::query();
        $bannedUserQuery = User::query()->onlyTrashed();

        if (request('searchUsers')) {
            $userQuery->where(function ($query) {
                $searchTerm = '%' . request('searchUsers') . '%';
                $query->where('username', 'like', $searchTerm)
                    ->orWhere('fullname', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('social_username', 'like', $searchTerm);
            });
            $queryParameters['searchUsers'] = request('searchUsers');
        }

        if (request('searchBannedUsers')) {
            $bannedUserQuery->where(function ($query) {
                $searchTerm = '%' . request('searchBannedUsers') . '%';
                $query->where('username', 'like', $searchTerm)
                    ->orWhere('fullname', 'like', $searchTerm)
                    ->orWhere('email', 'like', $searchTerm)
                    ->orWhere('social_username', 'like', $searchTerm);
            });
            $queryParameters['searchBannedUsers'] = request('searchBannedUsers');
        }

        // $userQuery = User::query();
        // $bannedUserQuery = User::query()->onlyTrashed();

        $paginationCount = 15;

        $paginatedUsers = $userQuery->paginate($paginationCount);

        $paginatedBannedUsers = $bannedUserQuery->paginate($paginationCount);

        // dump('users', $paginatedUsers);
        // dump('banned users', $paginatedBannedUsers);
        // dd();

        return Inertia::render('Admin/ManageUsers', [
            // 'users' => $users,
            // 'bannedUsers' => $bannedUsers,
            'paginatedUsers' => $paginatedUsers,
            'paginatedBannedUsers' => $paginatedBannedUsers
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


    //showcase photo

    public function showcase()
    {

        $carousels = CarouselPhoto::all()->map(function ($carousel) {
            return [
                'carouselID' => $carousel->carouselID,
                'title' => $carousel->title,
                'photoLink' => $carousel->photoLink
                    ? Storage::url($carousel->photoLink)
                    : null
            ];
        });

        return Inertia::render('Admin/ManageShowcase', [
            'carousels' => $carousels
        ]);


        // $carousels = CarouselPhoto::all();

        // return Inertia::render('Admin/ManageShowcase', [
        //     'carousels' => $carousels,
        // ]);
    }

    public function storeShowcase(Request $request)
    {
        // dd($request->hasFile('photoLink'));
        // Validation rules
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:carousel_photos|string|max:255',
            'photoLink' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Check validation
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Create product
        $showcase = new CarouselPhoto();

        $showcase->title = $request->input('title');


        // Handle image upload
        if ($request->hasFile('photoLink')) {
            $file = $request->file('photoLink');
            $filename = $file->getClientOriginalName();


            $file->storeAs('showcase', $filename, 'public');

            $urlPath = 'storage/showcase/' . $filename;

            $image = Image::read($urlPath)->cover(1200, 600, 'center');
            $image->save();

            $showcase->photoLink = 'showcase/' . $filename;
        } else {
            $showcase->photoLink = 'products/default.jpg';
        }

        $showcase->save();

        // Redirect back with a success message
        return redirect()->route('admin.showcase')->with('success', 'Showcase created successfully');
    }


    public function updateShowcase(Request $request, $id)
    {

        $showcase = CarouselPhoto::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'photoLink' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {

            return back()->withErrors($validator)->withInput();
        }

        $showcase->title = $request->input('title');

        // if ($request->hasFile('photoLink')) {
        //     // Delete old image
        //     if ($showcase->photoLink && Storage::exists($showcase->photoLink)) {
        //         Storage::delete($showcase->photoLink);
        //     }
        //     $showcase->photoLink = $request->file('photoLink')->store('showcase', 'public');
        // }

        if ($request->hasFile('photoLink')) {
            $filename = str_replace('showcase/', '', $showcase->photoLink);

            // dd($showcase->photoLink);
            // dd(Storage::disk('showcase')->exists($filename));
            if (Storage::disk('showcase')->exists($filename)) {

                Storage::disk('showcase')->delete($filename);
            }
            $file = $request->file('photoLink');
            $filename = $file->getClientOriginalName();

            $file->storeAs('showcase', $filename, 'public');

            $urlPath = 'storage/showcase/' . $filename;

            $image = Image::read($urlPath)->cover(1200, 600, 'center');
            $image->save();

            $showcase->photoLink = 'showcase/' . $filename;
        }


        $showcase->save();

        return redirect()->route('admin.showcase')->with('success', 'Showcase updated successfully');
    }

    public function destroyShowcase($id)
    {
        $showcase = CarouselPhoto::findOrFail($id);

        $filename = str_replace('showcase/', '', $showcase->photoLink);

        if (Storage::disk('showcase')->exists($filename)) {
            Storage::disk('showcase')->delete($filename);
        }

        $showcase->delete();

        return redirect()->route('admin.showcase')->with('success', 'Showcase deleted successfully');
    }
}
