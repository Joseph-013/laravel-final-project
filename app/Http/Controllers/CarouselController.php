<?php

namespace App\Http\Controllers;

use App\Models\CarouselPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarouselController extends Controller
{
    public function index(){
        $showcases = CarouselPhoto::all()
            ->map(function ($showcase) {
                return $showcase->photoLink 
                    ? Storage::url($showcase->photoLink) 
                    : null;
            })
            ->filter(); 
    
        return Inertia::render('Welcome', [
            'carouselImages' => $showcases,
            'user' => Auth::check() ? Auth::user() : false,
        ]);
    }
}
