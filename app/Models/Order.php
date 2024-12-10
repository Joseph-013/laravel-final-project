<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use PhpParser\JsonDecoder;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'specifications',
        'quantity',
        'order_deadline_date',
        'order_deadline_time',
        'pickup_type',
        'status'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function files()
    {
        return $this->hasMany(OrderFiles::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'Pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'Completed');
    }

    public function scopeCart($query)
    {
        return $query->where('status', 'Cart');
    }
}
