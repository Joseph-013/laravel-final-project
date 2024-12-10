<?php

use App\Helpers\Toast;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
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
    Route::get('/products', [ProductController::class, 'index'])->name('products');
});

// Auth
Route::middleware('auth', 'isUser')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('Welcome', []);
    })->name('home');

    Route::get('/products/{keyword}', [ProductController::class, 'showByKeyword'])->name('product.form');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders');

    Route::get('/cart', [CartController::class, 'index'])->name('cart');

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
        Route::patch('products/{id}', [AdminController::class, 'update'])->name('update');
        Route::delete('products/{id}', [AdminController::class, 'destroy'])->name('destroy');


        Route::get('users', [AdminController::class, 'users'])->name('users');
        Route::delete('{id}/banUser', [AdminController::class, 'banUser'])->name('banUser');
        Route::patch('{id}/unbanUser', [AdminController::class, 'unbanUser'])->name('unbanUser');
    });

require __DIR__ . '/auth.php';
