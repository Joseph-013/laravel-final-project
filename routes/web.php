<?php

use App\Http\Controllers\AdminController;
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
Route::middleware('auth', 'isUser')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Welcome', []);
    })->name('home');

    Route::get('/products/{keyword}', function ($keyword) {
        return Inertia::render('OrderForm', ['keyword' => $keyword]);
    })->name('product.form');

    Route::get('/orders', function () {
        return Inertia::render('Orders');
    })->name('orders');

    Route::get('/cart', function () {
        return Inertia::render('Cart');
    })->name('cart');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin 
Route::middleware(['auth', 'isAdmin'])
    ->prefix('/admin/')
    ->name('admin.')
    ->group(function () {

        Route::get('products', [AdminController::class, 'index'])->name('index');
        Route::post('products', [AdminController::class, 'store'])->name('store');
        Route::delete('products/{id}', [AdminController::class, 'destroy'])->name('destroy');
});

require __DIR__ . '/auth.php';
