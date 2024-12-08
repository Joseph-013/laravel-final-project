<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest
Route::get('/', function () {
    return Inertia::render('Welcome', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
        'user' => Auth::check() ? Auth::user() : false,
    ]);
})->middleware('guest')->name('index');

// Any
Route::middleware([])->group(function () {
    Route::get('/products', function () {
        return Inertia::render('Products');
    })->name('products');
});

// Auth
Route::middleware('auth')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Welcome', []);
    })->name('home');

    Route::get('/products/{keyword}', function ($keyword) {
        return Inertia::render('OrderForm', ['keyword' => $keyword]);
    })->name('product.form');

    Route::get('/cart', function () {
        return Inertia::render('Cart');
    })->name('cart');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
