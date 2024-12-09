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
}
