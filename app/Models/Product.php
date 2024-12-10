<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{

    protected $fillable = [
        'name',
        'description',
        'keyword',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    protected $appends = ['imageSrc'];


    // Relationships
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }


    // Mutators and Accessors
    public function getPriceFormattedAttribute()
    {
        return number_format($this->price, 2);
    }

    public function getImageSrcAttribute()
    {
        $extensions = ['jpg', 'png', 'webp', 'jpeg', 'jfif'];
    foreach ($extensions as $extension) {
        $filename = $this->keyword . '.' . $extension;
        if (Storage::disk('products')->exists($filename)) {
            return Storage::disk('products')->url($filename);
        }
    }

        // Check if the file exists in the products directory
        if (Storage::disk('products')->exists($filename)) {
            return Storage::disk('products')->url($filename);
        }
    }
}
