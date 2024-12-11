<?php

namespace App\Models;

use Carbon\Carbon;
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
        'address',
        'status',
    ];

    protected $appends = ['formatted_created_at', 'formatted_updated_at'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($order) {
            foreach ($order->files as $file) {
                $file->delete();
            }
        });
    }

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
        return $this->hasMany(OrderFiles::class, 'order_id');
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

    // Accessors
    // Accessor for formatted order_deadline_date
    public function getOrderDeadlineDateAttribute($value)
    {
        return Carbon::parse($value)->format('M j, Y'); // Example: "Sep 5, 2000"
    }

    // Accessor for formatted order_deadline_time
    public function getOrderDeadlineTimeAttribute($value)
    {
        return Carbon::parse($value)->format('g:i A'); // Example: "4:50 PM"
    }

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->format('M d, Y h:i A');
    }

    public function getFormattedUpdatedAtAttribute()
    {
        return Carbon::parse($this->updated_at)->format('M d, Y h:i A');
    }
}
