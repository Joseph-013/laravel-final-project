<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'specifications',
        'files',
        'quantity',
        'order_deadline_date',
        'order_deadline_time',
        'pickup_type',
        'status'
    ];

    protected $casts = [
        'files' => 'json',
    ];

    // Append custom attributes to the model's array form
    protected $appends = ['fileUrls'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(OrderItem::class);
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

    public function getFileUrlsAttribute()
    {
        // Assuming 'files' is a JSON array with URLs of files
        $urlPath = "files/orders/";
        $fileUrls = [];

        // If there are files, process them
        if (!empty($this->files)) {
            foreach ($this->files as $file) {
                // Assuming 'file' contains a path like 'products/somefile.pdf'
                // You can modify this logic to prepend the correct URL base
                // Here we assume the file is stored on the 'public' disk
                $fileUrls[] = $urlPath . $file; // Adjust based on your storage setup
            }
        }

        return $fileUrls;
    }
}
