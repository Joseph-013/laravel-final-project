<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderFiles extends Model
{
    protected $fillable = [
        'order_id',
        'filename'
    ];

    protected $appends = ['fileUrl'];

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
