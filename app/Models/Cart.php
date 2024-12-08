<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $primaryKey = 'cartID';
    protected $table = 'cart';

    protected $fillable = [
        'user_id', 'productID', 'quantity'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'productID');
    }

    // Calculate total price of cart items
    public function getTotalPriceAttribute()
    {
        return $this->product->price * $this->quantity;
    }
}