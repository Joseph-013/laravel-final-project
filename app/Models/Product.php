<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $primaryKey = 'productID';

    protected $fillable = [
        'image_path',
        'productname', 
        'description',
        'category', 
        'price', 
        'stock', 
    ];

    // Relationships
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'productID');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'productID');
    }

    // Scopes
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    // Mutators and Accessors
    public function getPriceFormattedAttribute()
    {
        return number_format($this->price, 2);
    }

    // File handling methods
    public function updateImage($newImage)
    {
        // Remove old image if exists
        if ($this->image_path && Storage::exists($this->image_path)) {
            Storage::delete($this->image_path);
        }

        // Store new image
        $newImagePath = $newImage->store('products', 'public');
        
        // Update model with new image path
        $this->image_path = $newImagePath;
        $this->save();

        return $newImagePath;
    }

    // Override delete method to remove associated file
    public function delete()
    {
        // Delete associated image if exists
        if ($this->image_path && Storage::exists($this->image_path)) {
            Storage::delete($this->image_path);
        }

        // Delete related cart entries
        $this->cart()->delete();

        // Delete related order items
        $this->orderItems()->delete();

        // Call parent delete method
        return parent::delete();
    }
}