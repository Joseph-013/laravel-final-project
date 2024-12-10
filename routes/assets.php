<?php

/**
 * Asset Management Routes
 *
 * This file defines routes related to serving and managing assets such as images and pdfs.
 * Commonly used for dynamic or static asset retrieval.
 *
 * Example routes that might be included:
 * - Dynamic image resizing or optimization.
 * - Serving user-uploaded content.
 * - Secure or time-limited access to files.
 *
 * Directory: routes/assets.php
 */

use App\Http\Controllers\FileController;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

// Route::prefix('/image')->name('image.')->controller(ImageController::class)->group(function () {
//     // Returns an array of images
//     Route::get('/carousel', 'carousel')->name('carousel');
// });

Route::prefix('/files')->middleware('auth')->name('files.')->group(function () {
    Route::get('/orders/{filename}', [FileController::class, 'order'])->name('order');
});
