<?php

use App\Helpers\Toast;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest
Route::get('/', [CarouselController::class, 'index'])->middleware('guest')->name('index');

// Any
Route::middleware([])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products');
});

// Auth
Route::middleware('auth', 'isUser')->group(function () {
    Route::get('/home', [CarouselController::class, 'index'])->name('home');

    Route::get('/products/{keyword}', [ProductController::class, 'showByKeyword'])->name('product.form');

    // Orders
    Route::controller(OrderController::class)->group(function () {
        Route::get('/orders', 'index')->name('orders.index');
        Route::post('/orders', 'store')->name('orders.store');
        Route::get('/orders/{id}', 'show')->name('orders.show');
        Route::patch('/orders/{id}', 'cancel')->name('orders.cancel');
    });

    // Cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::post('/cart/batch', [CartController::class, 'batchSend'])->name('cart.send');
    Route::delete('/cart/{id}', [OrderController::class, 'destroy'])->name('cart.destroy');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin
Route::middleware(['auth', 'isAdmin'])
    ->prefix('/admin')
    ->name('admin.')
    ->group(function () {

        //manage products routes
        Route::get('products', [AdminController::class, 'index'])->name('index');
        Route::post('products', [AdminController::class, 'store'])->name('store');
        Route::patch('products/{id}', [AdminController::class, 'update'])->name('update');
        Route::delete('products/{id}', [AdminController::class, 'destroy'])->name('destroy');

        //manage user routes
        Route::get('users', [AdminController::class, 'users'])->name('users');
        Route::delete('{id}/banUser', [AdminController::class, 'banUser'])->name('banUser');
        Route::patch('{id}/unbanUser', [AdminController::class, 'unbanUser'])->name('unbanUser');

        //manage order routes
        Route::controller(OrderController::class)->group(function () {
            Route::get('/orders', 'index')->name('orders.index');
            Route::get('/orders/{id}', 'show')->name('orders.show');
            Route::patch('/orders/{id}', 'updateStatus')->name('orders.updateStatus');
            Route::delete('/orders/{id}', 'destroy')->name('orders.destroy');
        });

        //manage showcase routes
        Route::get('showcase', [AdminController::class, 'showcase'])->name('showcase');
        Route::post('storeShowcase', [AdminController::class, 'storeShowcase'])->name('storeShowcase');
        Route::patch('showcase/{id}', [AdminController::class, 'updateShowcase'])->name('updateShowcase');
        Route::delete('showcase/{id}', [AdminController::class, 'destroyShowcase'])->name('destroyShowcase');
    });

require __DIR__ . '/auth.php';
require __DIR__ . '/assets.php';
