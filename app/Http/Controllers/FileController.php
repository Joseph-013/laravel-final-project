<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function showOrder($filename)
    {
        if (!Storage::disk('orders')->exists($filename)) abort(404);

        $filePath = Storage::disk('orders')->path($filename);

        return response()->file($filePath);
    }
}
