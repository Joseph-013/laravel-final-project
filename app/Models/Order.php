<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $primaryKey = 'orderID';

    protected $fillable = [
        'username', 'total_amount', 'status'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'orderID');
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

    // Helper method to calculate total
    public function calculateTotal()
    {
        return $this->orderItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }
}