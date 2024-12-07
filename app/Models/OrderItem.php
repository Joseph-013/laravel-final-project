<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'orderID', 'productID', 'quantity', 'price'
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class, 'orderID');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'productID');
    }

    // Accessor for total price of this order item
    public function getTotalPriceAttribute()
    {
        return $this->quantity * $this->price;
    }
}