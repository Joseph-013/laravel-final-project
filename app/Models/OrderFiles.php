<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OrderFiles extends Model
{
    protected $fillable = [
        'order_id',
        'filename'
    ];

    protected $appends = ['fileUrl'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($orderFile) {
            // Check if file exists before deleting
            if (Storage::disk('orders')->exists($orderFile->filename)) {
                Storage::disk('orders')->delete($orderFile->filename);
            }
        });
    }


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function getFileUrlAttribute()
    {
        $path = "/files/orders/";
        return $path . $this->filename;
    }
}
